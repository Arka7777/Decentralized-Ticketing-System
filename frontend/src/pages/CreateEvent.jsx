import { useState } from "react";
import axios from "axios";

export default function CreateEvent() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [totalTickets, setTotalTickets] = useState("");

  async function handleSubmit() {
    await axios.post("http://localhost:5000/create-event", {
      name,
      date,
      ticketPrice,
      totalTickets,
    });
    alert("Event Created!");
  }

  return (
    <div className="flex flex-col items-center mt-12">
      <h2 className="text-3xl font-semibold">Create New Event</h2>
      <div className="bg-white p-6 rounded shadow-lg w-1/2 mt-6">
        <input className="border p-2 w-full my-2" placeholder="Event Name" onChange={(e) => setName(e.target.value)} />
        <input className="border p-2 w-full my-2" type="date" onChange={(e) => setDate(e.target.value)} />
        <input className="border p-2 w-full my-2" placeholder="Ticket Price (ETH)" onChange={(e) => setTicketPrice(e.target.value)} />
        <input className="border p-2 w-full my-2" placeholder="Total Tickets" onChange={(e) => setTotalTickets(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full" onClick={handleSubmit}>Create</button>
      </div>
    </div>
  );
}
