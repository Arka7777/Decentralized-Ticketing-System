import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Ticket, Calendar, Star, Users } from "lucide-react";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/events").then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <header className="relative flex flex-col justify-center items-center h-[80vh] text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-gray-900 to-blue-900 opacity-90 z-0"></div>

        <motion.h1 
          className="text-6xl font-extrabold tracking-tight mb-4 relative z-10 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          The Future of <span className="text-blue-400">Event Ticketing</span>
        </motion.h1>

        <motion.p 
          className="text-lg text-gray-300 max-w-xl relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Securely buy, sell, and trade tickets using blockchain technology.
        </motion.p>

        <motion.div 
          className="mt-6 space-x-6 flex relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link to="/create-event" className="bg-blue-600 hover:bg-blue-400 text-white px-6 py-3 rounded-xl shadow-lg transition-all">
            🎟️ Create Event
          </Link>
          <Link to="/book-ticket" className="bg-white text-black px-6 py-3 rounded-xl shadow-lg hover:bg-gray-200 transition-all">
            📅 Book Ticket
          </Link>
        </motion.div>
      </header>

      {/* Stats Section */}
      <section className="py-16 px-8 text-center bg-gray-800">
        <h2 className="text-4xl font-bold mb-4 text-blue-400">📊 Platform Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-gray-900 rounded-lg">
            <Ticket className="w-12 h-12 mx-auto text-blue-400" />
            <h3 className="text-xl font-semibold mt-2">1,200+</h3>
            <p className="text-gray-400">Tickets Sold</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg">
            <Calendar className="w-12 h-12 mx-auto text-purple-400" />
            <h3 className="text-xl font-semibold mt-2">500+</h3>
            <p className="text-gray-400">Events Hosted</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg">
            <Users className="w-12 h-12 mx-auto text-green-400" />
            <h3 className="text-xl font-semibold mt-2">10,000+</h3>
            <p className="text-gray-400">Users</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg">
            <Star className="w-12 h-12 mx-auto text-yellow-400" />
            <h3 className="text-xl font-semibold mt-2">4.9/5</h3>
            <p className="text-gray-400">User Rating</p>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-gray-900">
        <h2 className="text-4xl font-semibold mb-8 text-center text-purple-400">🔥 Featured Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.eventId} event={event} />
          ))}
          {/* Additional Event Cards for Past, Ongoing, and Upcoming Events */}
          <EventCard event={{ eventId: "past1", title: "🎭 Past Event: Music Fest", date: "March 10, 2025", status: "Past", image: "https://th.bing.com/th/id/OIP.uoPbBSz8YFLw52nzSzUwcgHaE7?rs=1&pid=ImgDetMain", bgColor: "bg-gray-800" }} />
          <EventCard event={{ eventId: "ongoing1", title: "🔥 Ongoing Event: Tech Summit", date: "March 29, 2025", status: "Ongoing", image: "https://th.bing.com/th/id/OIP.uoPbBSz8YFLw52nzSzUwcgHaE7?rs=1&pid=ImgDetMain", bgColor: "bg-blue-800" }} />
          <EventCard event={{ eventId: "upcoming1", title: "🚀 Upcoming Event: Startup Expo", date: "April 15, 2025", status: "Upcoming", image: "https://th.bing.com/th/id/OIP.uoPbBSz8YFLw52nzSzUwcgHaE7?rs=1&pid=ImgDetMain", bgColor: "bg-purple-800" }} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold text-blue-400">💎 What People Say</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
          <div className="p-6 bg-gray-900 rounded-lg">
            <p className="text-gray-300">"The best ticketing platform! No fraud, no middlemen, just seamless booking."</p>
            <p className="mt-2 text-blue-400 font-semibold">- Alice B.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg">
            <p className="text-gray-300">"Blockchain-powered ticketing is the future. Love how secure it is!"</p>
            <p className="mt-2 text-blue-400 font-semibold">- John D.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg">
            <p className="text-gray-300">"No more scalping! Tickets are verified and tradable. Brilliant!"</p>
            <p className="mt-2 text-blue-400 font-semibold">- Sarah K.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {/* Security Features Section */}
<section className="py-16 bg-gray-900 text-center">
  <h2 className="text-4xl font-bold mb-8 text-blue-400">🛡️ Why Choose Blockchain Ticketing?</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
    <motion.div className="p-6 shadow-lg rounded-lg bg-gray-800 border border-gray-700" whileHover={{ scale: 1.05 }}>
      <h3 className="text-2xl font-semibold">🔒 Fraud Protection</h3>
      <p className="text-gray-400 mt-2">Blockchain prevents ticket duplication and ensures authenticity.</p>
    </motion.div>
    <motion.div className="p-6 shadow-lg rounded-lg bg-gray-800 border border-gray-700" whileHover={{ scale: 1.05 }}>
      <h3 className="text-2xl font-semibold">♻️ Secure Resale</h3>
      <p className="text-gray-400 mt-2">Tickets can be resold transparently without price manipulation.</p>
    </motion.div>
    <motion.div className="p-6 shadow-lg rounded-lg bg-gray-800 border border-gray-700" whileHover={{ scale: 1.05 }}>
      <h3 className="text-2xl font-semibold">💡 Smart Contracts</h3>
      <p className="text-gray-400 mt-2">Automated transactions ensure fair pricing and distribution.</p>
    </motion.div>
  </div>
</section>

{/* FAQ Section */}
<section className="py-16 bg-gray-800 text-center">
  <h2 className="text-4xl font-bold text-purple-400">❓ Frequently Asked Questions</h2>
  <div className="mt-8 px-6 md:px-20">
    <details className="mb-4 bg-gray-900 p-4 rounded-lg cursor-pointer">
      <summary className="text-lg font-semibold text-blue-400">How do I buy a ticket?</summary>
      <p className="text-gray-300 mt-2">You can browse events and purchase tickets securely through blockchain transactions.</p>
    </details>
    <details className="mb-4 bg-gray-900 p-4 rounded-lg cursor-pointer">
      <summary className="text-lg font-semibold text-blue-400">Can I resell my ticket?</summary>
      <p className="text-gray-300 mt-2">Yes! Your ticket is an NFT, meaning you can resell it on our marketplace securely.</p>
    </details>
    <details className="mb-4 bg-gray-900 p-4 rounded-lg cursor-pointer">
      <summary className="text-lg font-semibold text-blue-400">Is it safe from scammers?</summary>
      <p className="text-gray-300 mt-2">Absolutely! Every transaction is recorded on the blockchain, preventing fraud.</p>
    </details>
  </div>
</section>
    </div>
  );
}
