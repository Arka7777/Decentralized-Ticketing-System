import Event from "../Models/eventModel.js";


export const createEvent = async (req, res) => {
  try {
    const { name, description, date, location, organizer, ticketPrice, totalTickets, contractAddress } = req.body;

    const newEvent = new Event({
      name,
      description,
      date,
      location,
      organizer,
      ticketPrice,
      totalTickets,
      contractAddress
    });

    await newEvent.save();
    res.status(201).json({ success: true, message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating event", error });
  }
};


export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching events", error });
  }
};


export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching event", error });
  }
};
