// ✅ Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load .env
dotenv.config();

// ✅ Debug: Check if MONGO_URI is loaded
console.log("✅ MONGO_URI:", process.env.MONGO_URI);

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Serve static files if you’re using static frontend
app.use(express.static("public"));

// ✅ Routes
const bookingsRoute = require("./routes/bookings");
app.use("/api/bookings", bookingsRoute);

// ✅ Default route (optional)
app.get("/", (req, res) => {
  res.send("✅ Splash Zone Backend is running!");
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `🚀 Server running on http://localhost:${process.env.PORT || 5000}`
      );
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
