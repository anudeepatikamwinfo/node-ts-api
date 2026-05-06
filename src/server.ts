import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user.routes";
import app from "./app";
dotenv.config();


// ✅ Call DB connection
connectDB();
app.use("/api", userRoutes);
console.log("Routes Loaded");
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.listen(3000, () => {
  console.log("Server running");
});