import express from "express";
import { login, signup } from "../controllers/authController.js";
import upload from "../middleware/uploadMiddleware.js";
const authRouter = express.Router();

authRouter.post("/signup", upload.single("profile"), signup);
authRouter.post("/login", login);
export default authRouter;
