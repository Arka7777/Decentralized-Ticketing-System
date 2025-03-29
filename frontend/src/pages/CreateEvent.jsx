import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function CreateEvent() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [totalTickets, setTotalTickets] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  async function handleSubmit() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("date", date);
    formData.append("ticketPrice", ticketPrice);
    formData.append("totalTickets", totalTickets);
    formData.append("location", location);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    await axios.post("http://localhost:5000/create-event", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Event Created!");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
      <motion.h2 
        className="text-4xl font-bold text-blue-400 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🎭 Create a New Event
      </motion.h2>

      <motion.div 
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <input className="bg-gray-700 text-white border border-gray-600 p-3 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          placeholder="Event Name" onChange={(e) => setName(e.target.value)} />
        
        <input className="bg-gray-700 text-white border border-gray-600 p-3 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          type="date" onChange={(e) => setDate(e.target.value)} />
        
        <input className="bg-gray-700 text-white border border-gray-600 p-3 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          placeholder="Ticket Price (ETH)" onChange={(e) => setTicketPrice(e.target.value)} />
        
        <input className="bg-gray-700 text-white border border-gray-600 p-3 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          placeholder="Total Tickets" onChange={(e) => setTotalTickets(e.target.value)} />
        
        <input className="bg-gray-700 text-white border border-gray-600 p-3 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
        
        <input className="bg-gray-700 text-white border border-gray-600 p-3 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />

        <motion.button 
          className="bg-blue-600 hover:bg-blue-400 text-white px-6 py-3 rounded-lg w-full mt-4 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
        >
          🚀 Create Event
        </motion.button>
      </motion.div>
    </div>
  );
}
