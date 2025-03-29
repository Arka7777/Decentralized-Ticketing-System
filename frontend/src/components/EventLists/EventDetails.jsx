import { useParams, Link } from "react-router-dom";
import events from "../EventLists/Events";
import { Calendar, Ticket, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function EventDetails() {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return <div className="text-center text-white py-20">Event not found!</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-gray-900/90 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-10 border border-gray-800"
      >
        {/* Event Image */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-96 object-cover rounded-2xl shadow-xl"
          />
          <div className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-1 rounded-full shadow-md text-sm font-medium">
            {event.date}
          </div>
        </div>

        {/* Event Details */}
        <div className="mt-6 text-center">
          <h2 className="text-4xl font-extrabold text-white">{event.title}</h2>
          <p className="text-gray-300 text-lg mt-2">{event.description}</p>
        </div>

        {/* Event Meta Info */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-gray-300">
          <p className="flex items-center text-lg">
            <Calendar className="w-5 h-5 text-blue-400 mr-2" /> {event.date}
          </p>
          <p className="flex items-center text-lg">
            <Clock className="w-5 h-5 text-yellow-400 mr-2" /> {event.time}
          </p>
          <p className="flex items-center text-lg">
            <MapPin className="w-5 h-5 text-red-400 mr-2" /> {event.location}
          </p>
          <p className="flex items-center text-lg font-semibold text-green-400">
            <Ticket className="w-5 h-5 mr-2" /> ${event.price}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgba(0, 255, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all duration-300 w-full md:w-auto"
          >
            🎟️ Book Now
          </motion.button>

          <Link to="/book-ticket" className="w-full md:w-auto">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-800 transition-all duration-300 w-full md:w-auto"
            >
              ⬅ Back to Events
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
