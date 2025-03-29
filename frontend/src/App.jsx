import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import BookTicket from "./pages/BookTicket";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/book-ticket" element={<BookTicket />} />
      </Routes>
    </Router>
  );
}