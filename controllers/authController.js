const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config({ path: "./config.env" });
const secretKey = process.env.JWT_SECRET_KEY;

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already registered" });
    }

    // Create a new user object
    const user = new User({ username });

    // Set the password using the setPassword method (which generates the salt and hash)
    user.setPassword(password);

    // Save the user to the database
    await user.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // If user not found or invalid password, return error
    if (!user || !user.isValidPassword(password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h", // Token will expire in 1 hour
    });

    // Return the token and a success message
    return res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
