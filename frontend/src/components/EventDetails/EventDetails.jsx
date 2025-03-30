import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import { ABI } from "../../contracts/ABI";
import { ContractAddress } from "../../contracts/ContractAddress";
import { Calendar, Ticket } from "lucide-react";

export default function EventDetails({ eventId }) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [takenSeats, setTakenSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEventDetails();
    fetchTakenSeats();
  }, [eventId]);

  async function fetchEventDetails() {
    try {
      if (!window.ethereum) {
        alert("🦊 MetaMask not detected! Please install MetaMask.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(ContractAddress, ABI, provider);

      const eventDetails = await contract.getOccasion(eventId);
      setEvent({
        id: Number(eventDetails.id),
        name: eventDetails.name,
        cost: ethers.formatEther(eventDetails.cost), // Convert from Wei to ETH
        tickets: Number(eventDetails.tickets),
        maxTickets: Number(eventDetails.maxTickets),
        date: eventDetails.date,
        time: eventDetails.time,
        location: eventDetails.location,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching event details:", error);
      setLoading(false);
    }
  }

  async function fetchTakenSeats() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(ContractAddress, ABI, provider);
      const seats = await contract.getSeatsTaken(eventId);
      setTakenSeats(seats.map((seat) => Number(seat)));
    } catch (error) {
      console.error("Error fetching taken seats:", error);
    }
  }

  async function handleBooking(seatNumber) {
    try {
      setError("");
      if (!window.ethereum) throw new Error("Please install MetaMask!");
      if (!seatNumber) throw new Error("Please select a seat number!");

      const seatNum = Number(seatNumber);
      if (takenSeats.includes(seatNum))
        throw new Error("This seat is already taken!");
      if (seatNum <= 0 || seatNum > event.maxTickets)
        throw new Error("Invalid seat number!");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(ContractAddress, ABI, signer);

      const tx = await contract.mint(eventId, seatNum, {
        value: ethers.parseEther(event.cost.toString()),
        gasLimit: 300000,
      });

      await tx.wait();
      alert("🎉 Booking successful! Transaction: " + tx.hash);

      // Refresh taken seats
      await fetchTakenSeats();
      setSelectedSeat("");
    } catch (error) {
      console.error("Booking error:", error);
      setError(error.message || "Transaction failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {loading ? (
        <p className="text-gray-400 text-center">Loading event details...</p>
      ) : !event ? (
        <p className="text-gray-400 text-center">Event not found.</p>
      ) : (
        <div className="container mx-auto px-6 py-10">
          <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-800 p-6">
            <h1 className="text-4xl font-bold text-white">{event.name}</h1>
            <p className="text-gray-400 flex items-center mt-2">
              <Calendar className="w-5 h-5 text-blue-400 mr-2" /> {event.date} |{" "}
              {event.time} | {event.location}
            </p>
            <p className="text-gray-400">
              🎟 {event.tickets}/{event.maxTickets} tickets left
            </p>
            <p className="text-green-400 font-semibold text-lg flex items-center mt-2">
              <Ticket className="w-5 h-5 text-green-400 mr-2" /> {event.cost}{" "}
              ETH
            </p>

            {/* Booking Section */}
            <div className="mt-6">
              <div className="mb-4">
                <p className="text-gray-300 mb-2">Available Seats:</p>
                <div className="grid grid-cols-10 gap-2">
                  {[...Array(event.maxTickets)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`p-2 rounded ${
                        takenSeats.includes(index + 1)
                          ? "bg-red-500 cursor-not-allowed"
                          : selectedSeat === (index + 1).toString()
                          ? "bg-green-500"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                      onClick={() => setSelectedSeat((index + 1).toString())}
                      disabled={takenSeats.includes(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg"
                onClick={() => handleBooking(selectedSeat)}
                disabled={
                  !selectedSeat || takenSeats.includes(Number(selectedSeat))
                }
              >
                🎟️ Book Seat #{selectedSeat || ""}
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
