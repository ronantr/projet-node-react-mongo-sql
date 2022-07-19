import { register, login, getAllUsers } from "../controllers/userController.js";
import { Router } from "express";
import auth from "../middlewares/auth.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allusers/:id", getAllUsers);

export default router;
