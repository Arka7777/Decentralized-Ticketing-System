import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import BookTicket from "./pages/BookTicket";
import EventDetails from "./components/EventLists/EventDetails.jsx"; // Import the new component
// import Profile from "./pages/userDashboard";
import UserDashboard from "./pages/userDashboard";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/book-ticket" element={<BookTicket />} />
        <Route path="/event/:id" element={<EventDetails />} /> {/* New Route */}
        <Route path="/profile" element={<UserDashboard/>} />
      </Routes>
    </Router>
  );
}
