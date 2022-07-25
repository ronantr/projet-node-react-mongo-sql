import {
  deleteUser,
  getAllUsers,
  updateUser,
  getUserById,
} from "../controllers/userController.js";
import { Router } from "express";
import auth from "../middlewares/auth.js";
const router = Router();

router.get("/allusers", auth, getAllUsers);
router.get("/:id", auth, getUserById);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

export default router;
