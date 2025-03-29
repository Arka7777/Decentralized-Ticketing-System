import express from "express";
import { purchaseTicket, verifyTransaction } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/purchase", purchaseTicket); 
router.post("/verify", verifyTransaction); 

export default router;
