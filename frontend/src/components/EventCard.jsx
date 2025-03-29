export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 ">
      <h3 className="text-xl font-semibold">{event.name}</h3>
      <p className="text-gray-600">{event.date}</p>
      <p className="text-green-500 font-bold">{event.ticketPrice} ETH</p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Book Now</button>
    </div>
  );
}

