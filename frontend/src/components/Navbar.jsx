import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/70 shadow-lg text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
        >
          🎟️ TicketChain
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="relative text-lg hover:text-blue-400 transition-all duration-300">
            Home
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-400 transition-all duration-300 hover:w-full"></span>
          </Link>
          <Link to="/create-event" className="relative text-lg hover:text-blue-400 transition-all duration-300">
            Create Event
          </Link>
          <Link to="/book-ticket" className="relative text-lg hover:text-blue-400 transition-all duration-300">
            Book Ticket
          </Link>
        </div>

        {/* Connect Wallet Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-xl shadow-lg transition-all hover:shadow-blue-400/50"
        >
          🔗 Connect Wallet
        </motion.button>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu (Animated Slide-In) */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className={`fixed inset-y-0 right-0 w-64 bg-black/90 backdrop-blur-lg shadow-lg transform p-6 flex flex-col space-y-4 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <button className="self-end text-white" onClick={() => setIsOpen(false)}>
          <X size={32} />
        </button>
        <Link to="/" className="text-white text-lg hover:text-blue-400" onClick={() => setIsOpen(false)}>🏠 Home</Link>
        <Link to="/create-event" className="text-white text-lg hover:text-blue-400" onClick={() => setIsOpen(false)}>🎭 Create Event</Link>
        <Link to="/book-ticket" className="text-white text-lg hover:text-blue-400" onClick={() => setIsOpen(false)}>🎟️ Book Ticket</Link>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg shadow-lg w-full"
        >
          🔗 Connect Wallet
        </motion.button>
      </motion.div>
    </nav>
  );
}
