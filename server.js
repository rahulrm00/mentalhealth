const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const checkInRoutes = require("./routes/checkin");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((error) => console.error("MongoDB connection error:", error.message));

app.use("/api/auth", authRoutes);
app.use("/api/checkin", checkInRoutes);

const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
