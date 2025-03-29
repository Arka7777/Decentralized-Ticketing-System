import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ticketPrice: { type: String, required: true }, // Store as string for handling BigNumber
  totalTickets: { type: Number, required: true },
  ticketsSold: { type: Number, default: 0 },
  contractAddress: { type: String, required: true }, // Address of the deployed smart contract
});

export default mongoose.model("Event", eventSchema);
