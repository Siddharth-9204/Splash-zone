// ✅ Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load .env file
dotenv.config();

// Create Express app
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ✅ Routes
const bookingsRoute = require("./routes/bookings");
const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");

app.use("/api/bookings", bookingsRoute);
app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);

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
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
