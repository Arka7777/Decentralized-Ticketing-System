import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, unique: true, required: true },
  username: { type: String },
  email: { type: String, unique: true, sparse: true }, 
  ticketsOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }], 
}, { timestamps: true });

export default mongoose.model("User", userSchema);
