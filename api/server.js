import express from "express";
import { config } from "dotenv";
import ListRouter from "./routes/list.route.js";
import UserRouter from "./routes/user.route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import GoogleAuthRouter from "./routes/google-auth.route.js";
import cors from "cors";
import passport from "passport";
config();
import "./controllers/google-oauth.controller.js";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use(
  cors({
    origin:
      process.env.NODE_ENV == "production"
        ? "https://todo-frontend-l11j.onrender.com"
        : "http://localhost:5173",
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

async function StartServer() {
  try {
    mongoose.connect(process.env.URI).then(() => {
      console.log("Connected Successfully!");
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    });
  } catch (error) {
    console.log(error);
  }
}
app.use("/", ListRouter);
app.use("/", UserRouter);
app.use("/", GoogleAuthRouter);
StartServer();
