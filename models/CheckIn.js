const mongoose = require("mongoose");

const CheckInSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mood: { type: Number, required: true, min: 1, max: 10 },
    stress: { type: Number, required: true, min: 1, max: 10 },
    notes: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true } // Enables createdAt and updatedAt
);
module.exports = mongoose.model("CheckIn", CheckInSchema);
