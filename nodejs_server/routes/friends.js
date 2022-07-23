import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  sendFriendRequest,
  deleteFriend,
  accepteFriendRequest,
  rejectFriendRequest,
  getAllFriends,
  getFriendStatus,
} from "../controllers/friendController.js";
const router = Router();

router.post("/send-friend-request", sendFriendRequest);
router.delete("/", auth, deleteFriend);
router.post("/accept-friend-request", auth, accepteFriendRequest);
router.post("/reject-friend-request", auth, rejectFriendRequest);
router.get("all/:id", auth, getAllFriends);
router.post("/friendStatus", auth, getFriendStatus);

export default router;
