import { useState } from "react";
import { Wallet, Calendar, Ticket, TrendingUp, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export default function UserDashboard() {
  const [walletBalance, setWalletBalance] = useState("2.5 ETH");
  const [notifications, setNotifications] = useState([
    "🎟️ Your ticket for 'Blockchain Summit 2025' is confirmed!",
    "📅 New event 'Web3 Conference' is now available for booking.",
    "🔔 Your NFT ticket has been successfully verified.",
  ]);

  const bookingStats = [
    { name: "Jan", tickets: 3 },
    { name: "Feb", tickets: 5 },
    { name: "Mar", tickets: 2 },
    { name: "Apr", tickets: 7 },
    { name: "May", tickets: 4 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 pt-25">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Balance */}
        <motion.div 
          className="bg-black/40 p-6 rounded-xl shadow-lg backdrop-blur-md"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Wallet Balance</h2>
            <Wallet size={24} />
          </div>
          <p className="text-3xl font-bold mt-2">{walletBalance}</p>
          <button className="mt-4 bg-blue-500 px-4 py-2 rounded-lg w-full hover:bg-blue-600">
            🔗 Connect Wallet
          </button>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div 
          className="bg-black/40 p-6 rounded-xl shadow-lg backdrop-blur-md"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            <Calendar size={24} />
          </div>
          <ul className="mt-3 space-y-2">
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>Blockchain Summit 2025</span>
              <span className="text-blue-400">April 10</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>Web3 Conference</span>
              <span className="text-blue-400">May 18</span>
            </li>
          </ul>
          <Link to="/book-ticket" className="block mt-4 text-blue-400 hover:underline">
            View More ➜
          </Link>
        </motion.div>

        {/* Notifications */}
        <motion.div 
          className="bg-black/40 p-6 rounded-xl shadow-lg backdrop-blur-md"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <Bell size={24} />
          </div>
          <ul className="mt-3 space-y-2">
            {notifications.map((note, index) => (
              <li key={index} className="text-sm text-gray-300 flex">
                <span>✅</span>
                <p className="ml-2">{note}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Booking Statistics */}
        <motion.div 
          className="col-span-1 md:col-span-2 bg-black/40 p-6 rounded-xl shadow-lg backdrop-blur-md"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold flex items-center">
            <TrendingUp size={24} className="mr-2" /> Ticket Booking Stats
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={bookingStats}>
              <XAxis dataKey="name" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip />
              <Line type="monotone" dataKey="tickets" stroke="#38bdf8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Bookings */}
        <motion.div 
          className="bg-black/40 p-6 rounded-xl shadow-lg backdrop-blur-md"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold flex items-center">
            <Ticket size={24} className="mr-2" /> Recent Bookings
          </h2>
          <ul className="mt-3 space-y-2">
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>Ethereum Meetup 2025</span>
              <span className="text-green-400">✅ Confirmed</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>DeFi Expo 2025</span>
              <span className="text-yellow-400">⏳ Pending</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>NFT Art Show</span>
              <span className="text-red-400">❌ Canceled</span>
            </li>
          </ul>
          <Link to="/book-ticket" className="block mt-4 text-blue-400 hover:underline">
            Manage Bookings ➜
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
