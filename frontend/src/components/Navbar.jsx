import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, UserCircle } from "lucide-react";
import { useWallet } from "../contexts/walletContext";
import toast, { Toaster } from "react-hot-toast";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { account, isConnected, connectWallet, handleDisconnect, error } = useWallet();

  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Create Event", path: "/create-event", icon: "🎭" },
    { name: "Book Ticket", path: "/book-ticket", icon: "🎟️" }
  ];

  const profileItems = [
    { name: "Profile", path: "/profile", icon: "👤" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
    { name: "Logout", path: "/logout", icon: "🚪" }
  ];

  const handleConnectWallet = () => {
    if (!isConnected) {
      connectWallet();
      toast.success("Wallet Connected Successfully!", {
        duration: 3000,
        position: "center",
        style: {
          background: "blue",
          color: "#fff",
        },
      });
    } else {
      handleDisconnect();
      toast.error("Wallet Disconnected", {
        duration: 3000,
        position: "center",
        style: {
          background: "red",
          color: "#fff",
        },
      });
    }
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/70 shadow-lg text-white">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo with responsive text size */}
        <Link to="/" className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          🎟️ TicketChain
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-6">
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.path} 
                className="hover:text-blue-400 transition-all"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-xl shadow-lg transition-all ${
              isConnected ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-500 hover:bg-blue-400'
            }`}
            onClick={handleConnectWallet}
          >
            {isConnected ? `${account.slice(0, 6)}...${account.slice(-4)}` : "🔗 Connect Wallet"}
          </motion.button>

          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)} 
              className="focus:outline-none"
              aria-label="Profile menu"
            >
              <UserCircle size={36} className="text-white hover:text-blue-400 transition-all" />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg py-2 z-50"
                >
                  {profileItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="flex items-center px-4 py-2 hover:bg-gray-700"
                      onClick={closeAllMenus}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-4">
          {!isMobileMenuOpen && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 rounded-xl shadow-lg text-sm ${
                isConnected ? 'bg-green-600' : 'bg-blue-500'
              }`}
              onClick={handleConnectWallet}
            >
              {isConnected ? `${account.slice(0, 4)}...` : "🔗 Connect"}
            </motion.button>
          )}

          {!isMobileMenuOpen && (
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)} 
              className="focus:outline-none"
              aria-label="Profile menu"
            >
              <UserCircle size={32} className="text-white hover:text-blue-400" />
            </button>
          )}

          <button 
            className="text-white focus:outline-none" 
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsProfileOpen(false);
            }}
            aria-label="Mobile menu"
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          <AnimatePresence>
            {isProfileOpen && !isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-4 top-16 w-48 bg-gray-900 text-white rounded-lg shadow-lg py-2 z-50"
              >
                {profileItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="flex items-center px-4 py-2 hover:bg-gray-700"
                    onClick={closeAllMenus}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu with SOLID BLACK background */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-64 bg-black shadow-lg p-6 flex flex-col space-y-6 md:hidden z-40"
            onClick={closeAllMenus}
          >
            <button 
              className="self-end text-white mb-8" 
              onClick={closeAllMenus}
              aria-label="Close menu"
            >
              <X size={32} />
            </button>

            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center text-white text-xl hover:text-blue-400 py-3 border-b border-gray-700"
                onClick={closeAllMenus}
              >
                <span className="mr-3 text-2xl">{item.icon}</span>
                {item.name}
              </Link>
            ))}

            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`w-full mt-6 py-3 rounded-lg shadow-lg ${
                isConnected ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-500 hover:bg-blue-400'
              }`}
              onClick={() => {
                handleConnectWallet();
                closeAllMenus();
              }}
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