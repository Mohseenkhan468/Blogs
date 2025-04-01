import BlogModel from "../models/blogModel.js";
import Joi from "joi";
import mongoose from "mongoose";
export const createBlog = async (req, res) => {
  try {
    const title = req?.body?.title;
    const description = req?.body?.description;
    const user = req?.user;
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
    });
    const { error } = schema.validate(
      { title, description },
      { abortEarly: false }
    );
    if (error) {
      const errorMsg = error.details[0].message;
      return res.status(400).json({
        success: false,
        message: errorMsg,
      });
    }
    if (!req?.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }
    const newBlog = await new BlogModel({
      title,
      description,
      image_path: `/uploads/${req?.file?.filename}`,
      user_id: user._id,
    }).save();
    const blogObj = newBlog.toJSON();
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    blogObj.image_url = `${baseUrl}${blogObj.image_path}`;
    return res.status(201).json({
      success: true,
      message: "Blog created successfully.",
      data: blogObj,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const blogs = await BlogModel.aggregate([
      {
        $addFields: {
          image_url: { $concat: [baseUrl, "$image_path"] },
        },
      },
      {
        $lookup: {
          from: "users",
          as: "user",
          let: { user_id: "$user_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$user_id"] },
              },
            },
            {
              $addFields: {
                profile_url: { $concat: [baseUrl, "$profile_path"] },
              },
            },
            {
              $project: { email: 1, profile_url: 1 },
            },
          ],
        },
      },
      {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "comments",
          as: "comments",
          let: { blog_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$blog_id", "$$blog_id"],
                    },
                    { $eq: ["$comment_id", null] },
                  ],
                },
              },
            },
            {
              $lookup: {
                from: "comments",
                as: "replies",
                let: { comment_id: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$comment_id", "$$comment_id"],
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const editBlog = async (req, res) => {
  try {
    const blog_id = req?.params?.blog_id;
    if (!blog_id) {
      return res.status(400).json({
        success: false,
        message: "Blog id is required.",
      });
    }
    const user_id = req?.user?._id;
    const blog = await BlogModel.findOne({
      _id: new mongoose.Types.ObjectId(blog_id),
      user_id,
    });
    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "Blog not found.",
      });
    }
    const title = req?.body?.title;
    const description = req?.body?.description;
    const image_path = req?.file
      ? `/uploads/${req?.file?.filename}`
      : blog.image_path;
    if (req?.file) {
    }
    const editBlog = await BlogModel.findOneAndUpdate(
      { _id: blog._id },
      { $set: { title, description, image_path } },
      { new: true }
    );
    const blogObj=editBlog.toJSON()
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    blogObj.image_url = `${baseUrl}${blogObj.image_path}`;
    return res.status(201).json({
      success: true,
      message: "Blog edited successfully.",
      data: blogObj,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog_id = req?.params?.blog_id;
    if (!blog_id) {
      return res.status(400).json({
        success: false,
        message: "Blog id is required.",
      });
    }
    const user_id = req?.user?._id;
    const blog = await BlogModel.findOne({
      _id: new mongoose.Types.ObjectId(blog_id),
      user_id,
    });
    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "Blog not found.",
      });
    }
    await BlogModel.deleteOne({ _id: blog._id });
    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
