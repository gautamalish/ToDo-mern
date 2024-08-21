import express from "express";
import { config } from "dotenv";
import ListRouter from "./routes/list.route.js";
import UserRouter from "./routes/user.route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(
  cors({
    origin:
      process.env.NODE_ENV == "production"
        ? "https://todo-frontend-l11j.onrender.com"
        : "http://localhost:5173",
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

app.use(cookieParser());
app.use(express.json());
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
StartServer();
