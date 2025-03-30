import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import the Footer
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import BookTicket from "./pages/BookTicket";
import EventDetails from "./components/EventLists/EventDetails.jsx";
import UserDashboard from "./pages/userDashboard";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/book-ticket" element={<BookTicket />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/profile" element={<UserDashboard />} />
      </Routes>
      <Footer /> {/* Footer added here */}
    </Router>
  );
}
