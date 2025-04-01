import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    comment_id: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
    blog_id:{
        type:mongoose.Types.ObjectId,
        required:true
    }
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model("comment", commentSchema);

export default CommentModel;
