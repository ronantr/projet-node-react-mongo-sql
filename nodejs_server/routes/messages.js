import {
  addMessage,
  getAllMessages,
} from "../controllers/messageController.js";
import { Router } from "express";
import auth from "../middlewares/auth.js";

const router = Router();
router.post("/addMessage/", auth, addMessage);
router.post("/allMessages/", auth, getAllMessages);

export default router;
