const express = require("express");
const router = express.Router();

// ✅ Use the single shared Booking model
const Booking = require("../models/Booking");

// GET /api/admin/bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    console.error("Admin fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
