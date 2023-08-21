// app.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

// Generate a JWT Secret Key
// const generateJWTSecretKey = require("./generateJWTSecretKey");
// const secretKey = generateJWTSecretKey();
// console.log(secretKey);

const corsOptions = {
  origin: ["http://localhost:3000", "http://192.168.0.13:3000"],
}

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/file-upload", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB!");
});

// Routes
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/file", fileRoutes);

module.exports = app;
