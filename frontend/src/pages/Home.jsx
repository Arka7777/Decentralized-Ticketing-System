import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Ticket, Calendar, Star, Users, ChevronRight, Shield, RefreshCw, Zap } from "lucide-react";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Mock data for demonstration
  useEffect(() => {
    setEvents([
      {
        eventId: "1",
        title: "Blockchain Music Festival",
        date: "April 15, 2025",
        location: "Virtual Metaverse",
        price: "0.1 ETH",
        image: "https://th.bing.com/th/id/OIP.uoPbBSz8YFLw52nzSzUwcgHaE7?rs=1&pid=ImgDetMain",
        status: "Upcoming"
      },
      {
        eventId: "2",
        title: "Web3 Developer Conference",
        date: "May 20, 2025",
        location: "San Francisco",
        price: "0.25 ETH",
        image: "https://th.bing.com/th/id/OIP.uoPbBSz8YFLw52nzSzUwcgHaE7?rs=1&pid=ImgDetMain",
        status: "Upcoming"
      },
      {
        eventId: "3",
        title: "NFT Art Gallery Opening",
        date: "March 10, 2025",
        location: "New York",
        price: "0.05 ETH",
        image: "https://th.bing.com/th/id/OIP.uoPbBSz8YFLw52nzSzUwcgHaE7?rs=1&pid=ImgDetMain",
        status: "Past"
      }
    ]);
  }, []);

  const testimonials = [
    {
      quote: "The most seamless ticketing experience I've ever had. No middlemen, no hidden fees!",
      author: "Sarah Johnson",
      role: "Event Organizer"
    },
    {
      quote: "Finally a ticketing platform that puts power back in the hands of fans and creators.",
      author: "Michael Chen",
      role: "Music Artist"
    },
    {
      quote: "As a frequent concert-goer, the security and transparency is unmatched. Never going back!",
      author: "David Wilson",
      role: "Blockchain Enthusiast"
    }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Fraud Proof",
      description: "Every ticket is a unique NFT, eliminating counterfeits and scalping"
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Easy Resale",
      description: "Securely resell your tickets through our decentralized marketplace"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Access",
      description: "No waiting in line - digital tickets are instantly available in your wallet"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Tickets Sold", icon: <Ticket className="w-10 h-10" /> },
    { value: "500+", label: "Events Hosted", icon: <Calendar className="w-10 h-10" /> },
    { value: "50,000+", label: "Active Users", icon: <Users className="w-10 h-10" /> },
    { value: "4.9/5", label: "Satisfaction", icon: <Star className="w-10 h-10" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Cosmic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          
          {/* Floating Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: `${Math.random() * 10 + 2}px`,
                height: `${Math.random() * 10 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, (Math.random() - 0.5) * 100],
                x: [0, (Math.random() - 0.5) * 100],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Revolutionizing
              </span>{" "}
              <br className="md:hidden" />
              Event Ticketing
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              Powered by blockchain technology for secure, transparent, and decentralized ticket transactions
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <Link
                to="/create-event"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium text-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Create Event <ChevronRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/book-ticket"
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-medium text-lg hover:shadow-lg hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Browse Events <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by the Web3 Community
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of event organizers and attendees in the decentralized ticketing revolution
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 text-center hover:border-purple-500 transition-all"
              >
                <div className="text-purple-400 mx-auto mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming Featured Events
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover the hottest blockchain-powered events happening soon
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.eventId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/book-ticket"
              className="inline-flex items-center px-6 py-3 border border-gray-600 rounded-lg text-lg font-medium hover:bg-gray-700/50 hover:border-purple-500 transition-all"
            >
              View All Events <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Blockchain Ticketing?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of event ticketing with these powerful features
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all"
              >
                <div className="text-purple-400 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Hear from event organizers and attendees who've made the switch
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                      <p className="text-2xl italic mb-6">"{testimonial.quote}"</p>
                      <div>
                        <p className="text-xl font-semibold text-purple-400">{testimonial.author}</p>
                        <p className="text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${activeTestimonial === index ? 'bg-purple-500' : 'bg-gray-600'}`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience the Future of Ticketing?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Join thousands of event organizers and attendees in the decentralized ticketing revolution
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/create-event"
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-medium text-lg hover:shadow-lg hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Create Your Event <ChevronRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/book-ticket"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-medium text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Browse Events <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}