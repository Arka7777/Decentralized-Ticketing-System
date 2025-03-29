export default function EventCard({ event }) {
  return (
    <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 overflow-hidden">
      {/* Event Banner */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>

      {/* Event Details */}
      <h3 className="text-2xl font-bold text-gray-900 mt-4">{event.name}</h3>
      <p className="text-gray-500 mt-1">{event.date}</p>
      <p className="text-green-600 font-semibold text-lg mt-2">{event.ticketPrice} ETH</p>

      {/* Call-to-Action Button */}
      <button className="mt-5 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 text-white font-medium py-2 px-5 rounded-lg transition-all duration-300">
        Book Now
      </button>
    </div>
  );
}
