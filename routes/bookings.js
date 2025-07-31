const express = require("express");
const router = express.Router();

// ✅ Use the single shared Booking model
const Booking = require("../models/Booking");

// POST /api/bookings
router.post("/", async (req, res) => {
  try {
    const { name, email, date } = req.body;

    if (!name || !email || !date) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const booking = new Booking({ name, email, date });
    await booking.save();

    res.status(201).json({ success: true, message: "Booking successful!" });
  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    console.error("Booking fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
