import express from "express";
import connectDB from "./src/db/connect.js";
import "dotenv/config";
import authRouter from "./src/routers/authRouter.js";
import userRouter from "./src/routers/userRouter.js";
import blogRouter from "./src/routers/blogRouter.js";
import commentRouter from "./src/routers/commentRouter.js";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello");
});
const PORT = process.env.PORT || 3000;
app.use("/uploads", express.static("uploads"));
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.use("/comments", commentRouter);
connectDB(process.env.DB_URL || "mongodb://localhost:27017/blogdb");
app.listen(PORT, () => {
  console.log(`App is listening at PORT ${PORT}`);
});
