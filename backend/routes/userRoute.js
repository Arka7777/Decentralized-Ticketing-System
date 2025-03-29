import express from "express";
import { authenticateUser, getUserDetails } from "../controllers/userController.js";

const router = express.Router();

router.post("/auth", authenticateUser); 
router.get("/:walletAddress", getUserDetails); 

export default router;
