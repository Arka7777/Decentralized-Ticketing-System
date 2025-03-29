import {  Routes, Route } from "react-router-dom";
import EventList from "../components/EventLists/EventList.jsx";
import EventDetail from "../components/EventLists/EventDetails.jsx";

export default function BookTicket() {
  return (
    <div className="mb-[50px]">
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/event/:id" element={<EventDetail />} />
      </Routes>
    </div>
  );
}

