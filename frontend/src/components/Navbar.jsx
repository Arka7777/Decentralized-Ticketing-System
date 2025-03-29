import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ContractAddress } from "../contracts/ContractAddress";
import { ABI } from "../contracts/ABI";
import { ethers } from "ethers";
import { useWallet } from "../contexts/walletContext";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState(null);
  const { account, isConnected, connectWallet, handleDisconnect, error } = useWallet();

  return (
    <nav className="bg-black text-white px-6 py-4 fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          🎟️ TicketChain
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-400 transition-all">Home</Link>
          <Link to="/create-event" className="hover:text-blue-400 transition-all">Create Event</Link>
          <Link to="/book-ticket" className="hover:text-blue-400 transition-all">Book Ticket</Link>
        </div>

        {/* Wallet Section */}
        <div className="flex items-center gap-4">
          {error && <span className="text-red-400 text-sm hidden md:block">{error}</span>}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`hidden md:block ${
              loading 
                ? 'bg-gray-500' 
                : isConnected 
                  ? 'bg-green-600 hover:bg-green-500' 
                  : 'bg-blue-500 hover:bg-blue-400'
            } text-white px-4 py-2 rounded-lg shadow-lg`}
            onClick={isConnected ? handleDisconnect : connectWallet}
            disabled={loading}
          >
            {loading ? "Connecting..." : 
             isConnected ? `${account.slice(0, 6)}...${account.slice(-4)}` : 
             "Connect Wallet"}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black border-t border-gray-700 mt-4 px-6 py-4"
        >
          <Link to="/" className="block py-2 text-white hover:text-blue-400" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/create-event" className="block py-2 text-white hover:text-blue-400" onClick={() => setIsOpen(false)}>Create Event</Link>
          <Link to="/book-ticket" className="block py-2 text-white hover:text-blue-400" onClick={() => setIsOpen(false)}>Book Ticket</Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full mt-4 ${
              isConnected ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-500 hover:bg-blue-400'
            } text-white py-2 rounded-lg shadow-lg`}
            onClick={isConnected ? handleDisconnect : connectWallet}
          >
            {isConnected ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
          </motion.button>
          {error && <span className="text-red-400 text-sm mt-2 block">{error}</span>}
        </motion.div>

      )}
    </nav>
  );
}
