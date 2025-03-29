import express from "express";
import { createEvent, getEvents, getEventById } from "../controllers/eventController.js";

const router = express.Router();

router.post("/create", createEvent); 
router.get("/", getEvents); 
router.get("/:id", getEventById); 

export default router;
