import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();

// ✅ Call DB connection
connectDB();

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.listen(3000, () => {
  console.log("Server running");
});