import {
  addMessage,
  getAllMessages,
} from "../controllers/messageController.js";
import { Router } from "express";

const router = Router();
router.post("/addMessage/", addMessage);
router.post("/allMessages/", getAllMessages);

export default router;
