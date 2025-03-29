//nothing



import { motion } from "framer-motion";

export default function EventCard({ event }) {
  return (
    <motion.div 
      className={`p-6 rounded-xl shadow-lg ${event.bgColor || 'bg-gray-800'}`} 
      whileHover={{ scale: 1.05 }}
    >
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-2xl font-semibold text-white">{event.title}</h3>
      <p className="text-gray-300 mt-2">{event.date}</p>
      <span className={`inline-block px-3 py-1 mt-2 rounded-full text-sm font-semibold ${event.status === 'Past' ? 'bg-red-600' : event.status === 'Ongoing' ? 'bg-green-700' : 'bg-blue-950'}`}>
        {event.status}
      </span>
    </motion.div>
  );
}

