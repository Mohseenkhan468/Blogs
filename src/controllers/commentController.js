import mongoose from "mongoose";
import BlogModel from "../models/blogModel.js";
import CommentModel from "../models/commentModel.js";
import Joi from "joi";
export const createComment = async (req, res) => {
  try {
    const blog_id = req?.params?.blog_id;
    const blog = await BlogModel.findById(blog_id);
    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "Blog not found.",
      });
    }
    const title = req?.body?.title;
    const user = req?.user;
    const schema = Joi.object({
      title: Joi.string().required(),
    });
    const { error } = schema.validate({ title }, { abortEarly: false });
    if (error) {
      const errorMsg = error.details[0].message;
      return res.status(400).json({
        success: false,
        message: errorMsg,
      });
    }
    const newComment = await CommentModel({
      title,
      user_id: user._id,
      blog_id:blog_id,
    }).save()
    return res.status(201).json({
      success: true,
      message: "Comment made successfully.",
      data: newComment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const replyComment=async(req,res)=>{
    try {
        const comment_id = req?.params?.comment_id;
        const comment = await CommentModel.findById(comment_id);
        if (!comment) {
          return res.status(400).json({
            success: false,
            message: "Comment not found.",
          });
        }
        const title = req?.body?.title;
        const user = req?.user;
        const schema = Joi.object({
          title: Joi.string().required(),
        });
        const { error } = schema.validate({ title }, { abortEarly: false });
        if (error) {
          const errorMsg = error.details[0].message;
          return res.status(400).json({
            success: false,
            message: errorMsg,
          });
        }
        const newReply = await CommentModel({
          title,
          user_id: user._id,
          blog_id:comment.blog_id,
          comment_id:comment._id
        }).save()
        return res.status(201).json({
          success: true,
          message: "Reply made successfully.",
          data: newReply,
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      } 
}

export const deleteComment = async (req, res) => {
  try {
    const comment_id = req?.params?.comment_id;
    const user = req?.user;
    const comment = await CommentModel.findOne({
      _id: new mongoose.Types.ObjectId(comment_id),
      user_id: user._id,
    });
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment not found.",
      });
    }
    await CommentModel.deleteOne({ _id: comment._id });
    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
