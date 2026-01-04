import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import chatRoutes from "./routes/Chat.js";
import authRoutes from "./routes/AuthRoutes.js";

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGODB_URL;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
  ],
  credentials: true
}));

console.log("server");

// Routes
app.use("/api", chatRoutes);
app.use("/auth", authRoutes);

// Connect to MongoDB and start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected with DB");
  } catch (err) {
    console.log("Failed to connect with DB", err);
  }
};
