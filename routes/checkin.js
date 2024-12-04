const express = require("express");
const { authenticate } = require("../middleware/auth");  // Correct import
const CheckIn = require("../models/CheckIn");
const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  const { mood, stress, notes } = req.body;
  const user = req.user;  // From the authenticate middleware

  if (!user) {
    return res.status(400).json({ error: "User is required" });
  }

  try {
    const checkIn = new CheckIn({
      user, // Use the authenticated user's ID
      mood,
      stress,
      notes,
    });

    await checkIn.save();
    res.status(201).json({ message: "Check-in saved successfully" });
  } catch (error) {
    console.error("Error saving check-in:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;