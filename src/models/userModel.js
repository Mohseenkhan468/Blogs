import e from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  profile_path: {
    type: String,
    required: true,
    trim: true,
  },
},{timestamps:true});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
