import { Router } from "express";
import upload from "../middleware/uploadMiddleware.js";
import { createBlog,editBlog,getBlogs,deleteBlog } from "../controllers/blogController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const blogRouter = Router();

blogRouter.post("/add", upload.single("image"), authMiddleware, createBlog);
blogRouter.get('/list',authMiddleware,getBlogs)
blogRouter.patch('/:blog_id',upload.single("image"),authMiddleware,editBlog)
blogRouter.delete('/:blog_id',authMiddleware,deleteBlog)
export default blogRouter;
