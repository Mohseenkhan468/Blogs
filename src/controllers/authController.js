import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import UserModel from "../models/userModel.js";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "thisissecretkey";
const hashPassword = async (text) => {
  return await bcrypt.hash(text, 10);
};
const generateToken = async (payload) => {
  return await jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: "365d",
  });
};

export const signup = async (req, res) => {
  try {
    const email = req?.body?.email;
    const password = req?.body?.password;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });
    const { error } = schema.validate(
      { email, password },
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
        message: "Profile is required.",
      });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "This email is already registered.",
      });
    }
    const newUser = await new UserModel({
      email,
      password: await hashPassword(password),
      profile_path: `/uploads/${req?.file?.filename}`,
    }).save();
    const userObj = newUser.toJSON();
    delete userObj.password;
    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: userObj,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const email = req?.body?.email;
    const password = req?.body?.password;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });
    const { error } = schema.validate(
      { email, password },
      { abortEarly: false }
    );
    if (error) {
      const errorMsg = error.details[0].message;
      return res.status(400).json({
        success: false,
        message: errorMsg,
      });
    }
    console.log(req.body);
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "This email is not registered.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const payload = { _id: user._id, role: "user" };
    const token = await generateToken(payload);
    const userObj = user.toJSON();
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    delete userObj.password;
    userObj.profile_url = `${baseUrl}${user.profile_path}`;
    return res.status(201).json({
      success: true,
      message: "Login successfully.",
      token,
      data: userObj,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
