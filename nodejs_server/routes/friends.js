import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  sendFriendRequest,
  deleteFriend,
  accepteFriendRequest,
  rejectFriendRequest,
  getAllFriends,
  getFriendStatus,
  getAllFriendRequests,
} from "../controllers/friendController.js";
const router = Router();

router.post("/send-friend-request", auth, sendFriendRequest);
router.delete("/", auth, deleteFriend);
router.post("/accept-friend-request", auth, accepteFriendRequest);
router.post("/reject-friend-request", auth, rejectFriendRequest);
router.get("/all", auth, getAllFriends);
router.post("/friendStatus", auth, getFriendStatus);
router.get("/all-friend-requests", auth, getAllFriendRequests);

export default router;
