import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  sendFriendRequest,
  deleteFriend,
  accepteFriendRequest,
  rejectFriendRequest,
  getAllFriends,
} from "../controllers/friendController.js";
const router = Router();

router.post("/send-friend-request", sendFriendRequest);
router.delete("/delete", auth, deleteFriend);
router.post("/add", auth, accepteFriendRequest);
router.post("/reject", auth, rejectFriendRequest);
router.get("/:id", auth, getAllFriends);

export default router;
