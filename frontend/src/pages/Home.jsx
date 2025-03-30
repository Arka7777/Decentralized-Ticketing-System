import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Ticket, Calendar, Star, Users } from "lucide-react";


export default function Home() {
  const [events, setEvents] = useState([]);
 
  // useEffect(() => {
  //   axios.get("http://localhost:5000/events").then((res) => setEvents(res.data));
  // }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <header className="relative flex flex-col justify-center items-center h-screen text-center px-6 overflow-hidden">
  {/* Cosmic Animated Background */}
  <div className="absolute inset-0 overflow-hidden z-0">
    {/* Base Cosmic Gradient */}
    <motion.div 
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(124, 58, 237, 0.3) 0%, transparent 40%),
          radial-gradient(ellipse at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
          linear-gradient(to bottom right, #0f172a, #1e1b4b, #0c0a2e)
        `
      }}
      animate={{
        backgroundPosition: [
          "0% 0%", 
          "100% 50%", 
          "50% 100%"
        ]
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    
    {/* Animated Nebula Particles */}
    <div className="absolute inset-0">
      {[...Array(50)].map((_, i) => {
        const size = Math.random() * 8 + 2;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const color = `hsla(${Math.random() * 60 + 200}, 80%, 70%, ${Math.random() * 0.3 + 0.1})`;
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full blur-[1px]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 3}px ${size}px ${color}`
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
    
    {/* Floating Binary Code Matrix Effect */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => {
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        const length = Math.floor(Math.random() * 10) + 5;
        const binaryText = Array(length).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join(' ');
        
        return (
          <motion.div
            key={`binary-${i}`}
            className="absolute text-green-400/30 font-mono text-xs tracking-widest whitespace-nowrap"
            style={{
              left: `${Math.random() * 100}%`,
              writingMode: Math.random() > 0.5 ? 'vertical-rl' : 'horizontal-tb'
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: window.innerHeight + 100, opacity: [0, 0.3, 0] }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {binaryText}
          </motion.div>
        );
      })}
    </div>
    
    {/* Dynamic Light Beams */}
    {[...Array(3)].map((_, i) => {
      const angle = Math.random() * 360;
      const duration = Math.random() * 20 + 20;
      const delay = Math.random() * 5;
      
      return (
        <motion.div
          key={`beam-${i}`}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
          style={{
            transform: `rotate(${angle}deg)`,
            maskImage: 'linear-gradient(90deg, transparent, white 20%, white 80%, transparent)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      );
    })}
    
    {/* Interactive Floating Orbs (responds to mouse) */}
    <motion.div 
      className="absolute w-40 h-40 rounded-full blur-xl"
      style={{
        background: 'radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, transparent 70%)',
        left: '30%',
        top: '40%'
      }}
      animate={{
        x: [0, 20, 0, -20, 0],
        y: [0, 15, 0, -15, 0]
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    <motion.div 
      className="absolute w-60 h-60 rounded-full blur-xl"
      style={{
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
        right: '20%',
        bottom: '30%'
      }}
      animate={{
        x: [0, -30, 0, 30, 0],
        y: [0, -20, 0, 20, 0]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </div>

  {/* Content with enhanced effects */}
  <motion.div className="relative z-10">
    <motion.h1 
      className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 text-white"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        The Future
      </span>
      <br />
      <span className="text-white">of Event Ticketing</span>
    </motion.h1>

    <motion.p 
      className="text-xl text-gray-300 max-w-2xl mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      Securely buy, sell, and trade tickets using <span className="text-blue-300">blockchain technology</span> with zero fees.
    </motion.p>

    <motion.div 
      className="flex flex-col sm:flex-row gap-4 justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link 
        to="/create-event" 
        className="relative overflow-hidden group bg-gradient-to-br from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          🎟️ Create Event
        </span>
        <span className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </Link>
      
      <Link 
        to="/book-ticket" 
        className="relative overflow-hidden group bg-white/90 text-black px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          📅 Book Ticket
        </span>
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </Link>
    </motion.div>
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
