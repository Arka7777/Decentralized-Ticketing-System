import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import events from "../EventLists/Events";
import { Calendar, Ticket } from "lucide-react";

export default function EventList() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header with Animated Gradient Background */}
      <header className="relative py-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 opacity-90 blur-xl"></div>
        <motion.h2 
          className="relative text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🎟️ Upcoming Events
        </motion.h2>
        <motion.p 
          className="relative text-gray-300 mt-2 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Experience the future of event ticketing. Don't miss out!
        </motion.p>
      </header>

      {/* Events Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event) => (
            <motion.div 
              key={event.id} 
              whileHover={{ scale: 1.08 }}
              className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800 transition-all duration-300 hover:shadow-2xl hover:border-blue-500 hover:shadow-blue-500/50 hover:backdrop-blur-xl backdrop-filter backdrop-blur-lg"
            >
              <Link to={`/event/${event.id}`} className="block">
                {/* Parallax Image Effect */}
                <div className="relative overflow-hidden">
                  <motion.img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-60 object-cover rounded-t-2xl transition-transform duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-4 py-1 rounded-full shadow-md">
                    {event.date}
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-3xl font-semibold text-white">{event.title}</h3>
                  <p className="text-gray-400 flex items-center mt-2">
                    <Calendar className="w-5 h-5 text-blue-400 mr-2" /> {event.time} | {event.location}
                  </p>
                  <p className="text-green-400 font-semibold text-lg flex items-center mt-2">
                    <Ticket className="w-5 h-5 text-green-400 mr-2" /> ${event.price}
                  </p>

                  {/* Floating Animated Button */}
                  <motion.button 
                    whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-5 w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg"
                  >
                    🚀 Explore
                  </motion.button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <section className="py-20 mt-16 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-gray-900 to-blue-900 opacity-80 blur-lg"></div>
        <motion.h2 
          className="relative text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🎭 Create Your Own Event
        </motion.h2>
        <p className="relative text-gray-300 mt-2">
          Host and sell tickets securely with blockchain technology.
        </p>
        <motion.div 
          className="mt-6 relative"
          whileHover={{ scale: 1.1 }}
        >
          <Link 
            to="/create-event" 
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-400 transition-all hover:scale-105 duration-300"
          >
            🚀 Get Started
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
