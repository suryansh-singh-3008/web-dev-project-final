import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import parkingRoutes from "./routes/parking.js";
import authRoutes from "./routes/auth.js";


console.log("🚀 Starting backend...");

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


// Routes
app.use("/api/parking", parkingRoutes);

// Test route (you can remove later)
app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKS");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
