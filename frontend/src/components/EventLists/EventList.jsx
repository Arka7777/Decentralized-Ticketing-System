import { Link } from "react-router-dom";
import events from "../EventLists/Events";

export default function EventList() {
  return (
    <div className="container mx-auto mt-12">
      <h2 className="text-3xl font-semibold text-center">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {events.map((event) => (
          <Link key={event.id} to={`/event/${event.id}`} className="block bg-white shadow-lg rounded-lg p-4 hover:bg-slate-300">
            <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl font-semibold mt-2">{event.title}</h3>
            <p className="text-gray-600">{event.date} | {event.time}</p>
            <p className="text-green-600 font-semibold mt-1">${event.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
