const User = require("../models/user.model.js");
const { validationResult } = require('express-validator'); // Corrected import

// Route handlers must take (req, res) as parameters
const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for validation errors first
    const validateError = validationResult(req);
    if (!validateError.isEmpty()) {
      return res.status(400).json({ message: validateError.array() });
    }

    // Check if user already exists
    const userExistance = await User.findOne({ email });
    if (userExistance) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password,
    });

    return res.status(200).json({ 
      message: "New user created successfully",
      user: newUser
    });
  } catch (error) {
    console.error("Error during new user creation:", error);
    return res.status(500).json({ message: error.message });
  }
};

const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by their email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare the provided password with the stored password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate token and set as a cookie
    const token = user.generateJwtToken(); // Corrected function name
    res.cookie("token", token);

    res.status(200).json({ message: "User signed in successfully.",user,token });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: error.message });
  }
};

// Renamed for clarity, assuming it's for logging out
const userLogout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully." });
};

const userProfile = async (req, res) => {
  // `req.user` is populated by the auth middleware
  res.json(req.user);
};

// Corrected exports
module.exports = { userRegister, userSignIn, userProfile, userLogout };