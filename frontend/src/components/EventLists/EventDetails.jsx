import { useParams, Link } from "react-router-dom";
import events from "../EventLists/Events";
import { Calendar, Ticket, MapPin, Clock, X } from "lucide-react";
import { motion } from "framer-motion";
import { useWallet } from "../../contexts/walletContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ethers } from "ethers";

export default function EventDetails() {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));
  const { account, contract, isConnected, connectWallet } = useWallet();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSeatLayout, setShowSeatLayout] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [seats, setSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [isLoadingSeats, setIsLoadingSeats] = useState(false);

  if (!event) {
    return <div className="text-center text-white py-20">Event not found!</div>;
  }
   
  // Fetch seat data when modal opens
  useEffect(() => {
    const fetchSeats = async () => {
      if (showSeatLayout && contract) {
        try {
          setIsLoadingSeats(true);
          
          // Get all seats for this event
          const totalSeats = event.maxSeats || 100;
          const seatsArray = Array.from({ length: totalSeats }, (_, i) => i + 1);
          
          // Get occupied seats from contract
          const taken = await contract.getSeatsTaken(event.id);
          const takenSeats = taken.map(seat => Number(seat));
          
          setSeats(seatsArray);
          setOccupiedSeats(takenSeats);
        } catch (error) {
          console.error("Error fetching seat data:", error);
          toast.error("Failed to load seat information");
        } finally {
          setIsLoadingSeats(false);
        }
      }
    };
    
    fetchSeats();
  }, [showSeatLayout, contract, event.id, event.maxSeats]);

  const handleBookNow = () => {
    if (!isConnected) {
      connectWallet();
      toast.info("Please connect your wallet to book tickets");
      return;
    }
    setShowSeatLayout(true);
  };

  const toggleSeatSelection = (seat) => {
    if (occupiedSeats.includes(seat)) return;

    setSelectedSeats(prev => {
      if (prev.includes(seat)) {
        return prev.filter(s => s !== seat);
      } else {
        return [...prev, seat];
      }
    });
  };

  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
  
    setIsBooking(true);
    try {
      // First check if user already has tickets
      const userTickets = await contract.ticketsOwned(event.id, account);
  
      // Ensure `userTickets` is a number
      const userTicketCount = userTickets?._isBigNumber ? userTickets.toNumber() : Number(userTickets || 0);
  
      if (userTicketCount + selectedSeats.length > 5) {
        throw new Error("You can't buy more than 5 tickets for this event");
      }
  
      // Check if seats are still available
      const currentTakenSeats = await contract.getSeatsTaken(event.id);
      const newlyTaken = selectedSeats.filter(seat => 
        Array.isArray(currentTakenSeats) 
          ? currentTakenSeats.map(s => Number(s)).includes(seat)
          : false
      );
  
      if (newlyTaken.length > 0) {
        throw new Error(`Seat(s) ${newlyTaken.join(', ')} were just taken`);
      }
  
      // Ensure event.price is a valid number
      if (!event.price || isNaN(event.price)) {
        throw new Error("Invalid event price. Please try again later.");
      }
      
      // Fix: Proper price calculation
      const pricePerTicket = ethers.utils.parseEther(event.price.toString());
      const totalPrice = pricePerTicket.mul(selectedSeats.length);
  
      // Fix: Since batchMint doesn't exist, we'll mint each ticket individually
      const txPromises = [];
      
      for (const seat of selectedSeats) {
        const tx = await contract.mint(event.id, seat, { value: pricePerTicket });
        txPromises.push(tx.wait());
        
        // Show notification for each transaction
        toast.info(
          <div>
            <p>Transaction submitted for seat {seat}!</p>
            <a 
              href={`https://testnet.snowtrace.io/tx/${tx.hash}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 underline text-sm"
            >
              View on Snowtrace
            </a>
          </div>,
          { autoClose: false }
        );
      }
      
      // Wait for all transactions to complete
      await Promise.all(txPromises);
  
      toast.success(
        <div>
          <p>Successfully booked {selectedSeats.length} ticket(s)!</p>
          <p className="text-sm">Seats: {selectedSeats.join(', ')}</p>
        </div>
      );
  
      setShowSeatLayout(false);
      setSelectedSeats([]);
      setOccupiedSeats(prev => [...prev, ...selectedSeats]);
    } catch (err) {
      console.error("Booking failed:", err);
      let errorMessage = err.message;
  
      if (err.message.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for this transaction";
      } else if (err.message.includes("user rejected transaction")) {
        errorMessage = "Transaction rejected by user";
      } else if (err.message.includes("seat already taken")) {
        errorMessage = "One or more seats were already taken";
      } else if (err.message.includes("reverted")) {
        errorMessage = "Transaction reverted - check contract requirements";
      }
  
      toast.error(errorMessage);
    } finally {
      setIsBooking(false);
    }
  };
  

  // Render cinema-style seat layout
  const renderSeatLayout = () => {
    if (isLoadingSeats) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    // Create rows with 10 seats each
    const rows = [];
    for (let i = 0; i < seats.length; i += 10) {
      rows.push(seats.slice(i, i + 10));
    }

    return (
      <div className="space-y-6">
        {/* Screen */}
        <div className="text-center py-4 bg-gradient-to-t from-gray-700 to-gray-900 rounded-lg shadow-inner mx-16">
          <p className="text-lg font-bold text-gray-300">SCREEN THIS WAY</p>
        </div>

        {/* Seat rows */}
        <div className="overflow-auto max-h-[60vh] py-4 px-2">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 w-6 text-center">
                  {String.fromCharCode(65 + rowIndex)}
                </span>
                {row.map((seat) => {
                  const isOccupied = occupiedSeats.includes(seat);
                  const isSelected = selectedSeats.includes(seat);
                  
                  return (
                    <button
                      key={seat}
                      onClick={() => toggleSeatSelection(seat)}
                      disabled={isOccupied}
                      className={`
                        w-8 h-8 rounded flex items-center justify-center text-xs font-medium
                        transition-all duration-200
                        ${isSelected ? 
                          'bg-blue-500 text-white transform scale-110' : 
                          isOccupied ? 
                            'bg-red-500 cursor-not-allowed opacity-60' : 
                            'bg-gray-600 hover:bg-gray-500 hover:scale-105'
                        }
                      `}
                      title={isOccupied ? "Already booked" : `Seat ${seat}`}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Seat legend */}
        <div className="flex justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-600 rounded mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-4 sm:px-6">
      {/* Event details card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-gray-900/90 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 border border-gray-800"
      >
        {/* Event Image */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl shadow-xl"
          />
          <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full shadow-md text-sm font-medium">
            {event.date}
          </div>
        </div>

        {/* Event Details */}
        <div className="mt-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{event.title}</h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2">{event.description}</p>
        </div>

        {/* Event Meta Info */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-6 text-gray-300">
          <p className="flex items-center text-sm sm:text-base">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-1 sm:mr-2" /> {event.date}
          </p>
          <p className="flex items-center text-sm sm:text-base">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-1 sm:mr-2" /> {event.time}
          </p>
          <p className="flex items-center text-sm sm:text-base">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mr-1 sm:mr-2" /> {event.location}
          </p>
          <p className="flex items-center text-sm sm:text-base font-semibold text-green-400">
            <Ticket className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" /> {event.price} AVAX
          </p>
        </div>

        {/* Wallet Connection Status */}
        {isConnected && (
          <div className="mt-4 text-center text-xs sm:text-sm text-green-400">
            Connected as: {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBookNow}
            disabled={isBooking}
            className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all duration-300 ${
              isBooking ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isBooking ? "Processing..." : "🎟️ Book Now"}
          </motion.button>

          <Link to="/events" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-800 transition-all duration-300 w-full"
            >
              ⬅ Back to Events
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Seat Selection Modal */}
      {showSeatLayout && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-700 shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-800">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">{event.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  {event.date} • {event.time} • {event.location}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowSeatLayout(false);
                  setSelectedSeats([]);
                }}
                className="text-gray-400 hover:text-white p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Seat Layout */}
            <div className="p-4 sm:p-6 overflow-auto">
              {renderSeatLayout()}
            </div>

            {/* Footer with selected seats and payment button */}
            <div className="p-4 sm:p-6 border-t border-gray-800 bg-gray-900/50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  {selectedSeats.length > 0 ? (
                    <>
                      <p className="font-medium">Selected: {selectedSeats.join(', ')}</p>
                      <p className="text-green-400 font-bold">
                        Total: {(selectedSeats.length * event.price).toFixed(2)} AVAX
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-400">No seats selected</p>
                  )}
                </div>
                <button
                  onClick={handleConfirmBooking}
                  disabled={selectedSeats.length === 0 || isBooking}
                  className={`px-6 py-3 rounded-lg font-bold w-full sm:w-auto ${
                    selectedSeats.length === 0 || isBooking
                      ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white'
                  }`}
                >
                  {isBooking ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-2">↻</span>
                      Processing...
                    </span>
                  ) : (
                    `Pay ${(selectedSeats.length * event.price).toFixed(2)} AVAX`
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}