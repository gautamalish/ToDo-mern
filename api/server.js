import express from "express";
import { config } from "dotenv";
import ListRouter from "./routes/list.route.js";
import mongoose from "mongoose";
import cors from "cors";
config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());

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
StartServer();
