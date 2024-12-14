const jwt = require("jsonwebtoken")
const express = require("express")
const router = express.Router()

const User = require("../modals/User")

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "Akakpo");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

// Get User Profile Route
router.get("/api/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      dietaryRestrictions: user.dietaryRestrictions,
      allergies: user.allergies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving profile", error });
  }
});

// Update User Profile Route
router.put("/api/profile", authenticate, async (req, res) => {
  try {
    const { dietaryRestrictions, allergies } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { dietaryRestrictions, allergies },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating profile", error });
  }
});

module.exports = router