import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import events from "../EventLists/Events";

export default function EventDetail() {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));
  const [loading, setLoading] = useState(false);

  async function bookTicket() {
    setLoading(true);
    await axios.post("http://localhost:5000/buy-ticket", { eventId: id });
    setLoading(false);
    alert("Ticket Booked!");
  }

  if (!event) return <h2 className="text-center mt-12 text-xl">Event Not Found</h2>;

  return (
    <div className="container mx-auto mt-12 max-w-2xl">
      <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-lg" />
      <h2 className="text-3xl font-semibold mt-4">{event.title}</h2>
      <p className="text-gray-600 mt-2">{event.date} | {event.time}</p>
      <p className="text-green-600 font-semibold mt-1">${event.price}</p>
      <p className="mt-4">{event.description}</p>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full"
        onClick={bookTicket}
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
}
