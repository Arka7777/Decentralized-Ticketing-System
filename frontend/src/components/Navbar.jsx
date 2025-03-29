import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, UserCircle } from "lucide-react";
import { useWallet } from "../contexts/walletContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // Fixed: Added state for profile dropdown
  const { account, isConnected, connectWallet, handleDisconnect, error } = useWallet();

  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Create Event", path: "/create-event", icon: "🎭" },
    { name: "Book Ticket", path: "/book-ticket", icon: "🎟️" }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/70 shadow-lg text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          🎟️ TicketChain
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <Link key={index} to={item.path} className="hover:text-blue-400 transition-all">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Section: Wallet + Profile Icon */}
        <div className="flex items-center space-x-6">
          {/* Connect Wallet Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`hidden md:block px-5 py-2 rounded-xl shadow-lg transition-all ${
              isConnected ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-500 hover:bg-blue-400'
            }`}
            onClick={isConnected ? handleDisconnect : connectWallet}
          >
            {isConnected ? `${account.slice(0, 6)}...${account.slice(-4)}` : "🔗 Connect Wallet"}
          </motion.button>

          {/* Profile Icon */}
          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)} className="focus:outline-none">
              <UserCircle size={36} className="text-white hover:text-blue-400 transition-all" />
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg py-2"
                >
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">👤 Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-gray-700">⚙️ Settings</Link>
                  <button className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white">
                    🚪 Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-64 bg-black/90 backdrop-blur-lg shadow-lg p-6 flex flex-col space-y-4 md:hidden"
          >
            <button className="self-end text-white" onClick={() => setIsOpen(false)} aria-label="Close menu">
              <X size={32} />
            </button>

            {navItems.map((item, index) => (
              <Link key={index} to={item.path} className="text-white text-lg hover:text-blue-400" onClick={() => setIsOpen(false)}>
                {item.icon} {item.name}
              </Link>
            ))}

            {/* Connect Wallet Button for Mobile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full mt-4 py-2 rounded-lg shadow-lg ${
                isConnected ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-500 hover:bg-blue-400'
              }`}
              onClick={isConnected ? handleDisconnect : connectWallet}
            >
              {isConnected ? `${account.slice(0, 6)}...${account.slice(-4)}` : "🔗 Connect Wallet"}
            </motion.button>

            {error && <span className="text-red-400 text-sm mt-2 block">{error}</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
