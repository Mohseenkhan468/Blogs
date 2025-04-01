import { Router } from "express";
import {
  createComment,
  deleteComment,
  replyComment,
} from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const commentRouter = Router();

commentRouter.post("/:blog_id", authMiddleware, createComment);
commentRouter.post("/reply/:comment_id", authMiddleware, replyComment);
commentRouter.delete("/:comment_id", authMiddleware, deleteComment);

export default commentRouter;
