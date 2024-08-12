import express from "express";
import { config } from "dotenv";
import ListRouter from "./routes/list.route.js";
config();
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/", ListRouter);
