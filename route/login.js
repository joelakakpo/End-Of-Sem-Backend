const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../modals/User") // Ensure this path is correct

// Login Route
router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Email: ${email} || Password:${password}`);

    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Invalid email or password");
      return res.status(400).json({ message: "Invalid email or password." });
    }
    console.log("User found:", user);

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password");
      return res.status(400).json({ message: "Invalid email or password." });
    }
    console.log("Password match");

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, "Akakpo", { expiresIn: "1h" });

    console.log("Login successful");
    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        dietaryRestrictions: user.dietaryRestrictions,
        allergies: user.allergies,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during login", error });
  }
});

module.exports = router;
