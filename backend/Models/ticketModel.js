import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  owner: { type: String, required: true }, 
  tokenId: { type: String, required: true }, 
  transactionHash: { type: String, required: true }, 
  status: { type: String, enum: ["active", "transferred", "cancelled"], default: "active" },
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);
