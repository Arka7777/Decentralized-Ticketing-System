import { ethers } from "ethers";
import Ticket from "../models/Ticket.js";


export const purchaseTicket = async (req, res) => {
  try {
    const { event, walletAddress, contractAddress, amount, tokenId, transactionHash } = req.body;


    const newTicket = new Ticket({
      event,
      owner: walletAddress,
      tokenId,
      transactionHash
    });

    await newTicket.save();

    res.status(201).json({ success: true, message: "Ticket purchased successfully", ticket: newTicket });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error processing ticket purchase", error });
  }
};


export const verifyTransaction = async (req, res) => {
  try {
    const { transactionHash, rpcUrl } = req.body;

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const receipt = await provider.getTransactionReceipt(transactionHash);

    if (!receipt) return res.status(404).json({ success: false, message: "Transaction not found on blockchain" });

    res.status(200).json({ success: true, receipt });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error verifying transaction", error });
  }
};
