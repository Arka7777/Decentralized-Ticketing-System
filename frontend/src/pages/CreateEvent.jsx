import { useState } from "react";
import { ethers } from "ethers";
import { ABI } from "../contracts/ABI";
import { ContractAddress } from "../contracts/ContractAddress";
import { motion } from "framer-motion";

export default function CreateEvent() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [totalTickets, setTotalTickets] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!name || !date || !ticketPrice || !totalTickets || !location) {
        throw new Error("⚠️ Please fill all fields.");
      }

      const price = parseFloat(ticketPrice);
      if (isNaN(price) || price <= 0) {
        throw new Error("⚠️ Ticket price must be a positive number.");
      }

      const tickets = parseInt(totalTickets);
      if (isNaN(tickets) || tickets <= 0) {
        throw new Error("⚠️ Total tickets must be a positive integer.");
      }

      if (!window.ethereum) {
        throw new Error("🦊 MetaMask not detected! Please install MetaMask.");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(ContractAddress, ABI, signer);

      const priceInWei = ethers.parseEther(ticketPrice);
      console.log(contract.occasions);
      const tx = await contract.list(
        name,
        priceInWei,
        tickets,
        date,
        "18:00",
        location,
        { gasLimit: 500000 }
      );

      console.log("📡 Transaction sent:", tx.hash);
      alert(`✅ Transaction submitted! Hash: ${tx.hash}`);

      const receipt = await tx.wait();
      console.log("✅ Transaction confirmed:", receipt);

      if (receipt.status === 1) {
        alert("🎉 Event created successfully!");
        setName("");
        setDate("");
        setTicketPrice("");
        setTotalTickets("");
        setLocation("");
      } else {
        throw new Error("⚠️ Transaction failed on the blockchain.");
      }
    } catch (error) {
      console.error("🚨 Transaction error:", error);
      alert(`❌ Error: ${error.message || "Unknown error occurred."}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
      <motion.h2 className="text-4xl font-bold text-blue-400 mb-6 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        🎭 Create a New Event
      </motion.h2>

      <motion.div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-lg" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        <form onSubmit={handleSubmit}>
          <input className="bg-gray-700 text-white border border-gray-600 p-3 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="bg-gray-700 text-white border border-gray-600 p-3 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" value={date} onChange={(e) => setDate(e.target.value)} required />
          <input className="bg-gray-700 text-white border border-gray-600 p-3 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Ticket Price (ETH)" type="number" step="0.01" min="0.01" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} required />
          <input className="bg-gray-700 text-white border border-gray-600 p-3 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Total Tickets" type="number" min="1" value={totalTickets} onChange={(e) => setTotalTickets(e.target.value)} required />
          <input className="bg-gray-700 text-white border border-gray-600 p-3 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />

          <motion.button className={`bg-blue-600 text-white px-6 py-3 rounded-lg w-full mt-4 transition-all ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-400"}`} whileHover={!isLoading ? { scale: 1.05 } : {}} whileTap={!isLoading ? { scale: 0.95 } : {}} type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "🚀 Create Event"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}