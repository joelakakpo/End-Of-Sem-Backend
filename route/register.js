const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router()
const User = require("../modals/User")

// Register Route
router.post("/api/register", async (req, res) => {
  try {
    const { username, email, password, dietaryRestrictions, allergies } = req.body;
    console.log(`username: ${username} || email:${email} || password:${password} || Dietary Restrictions ${dietaryRestrictions} || Allergies:${allergies}`)

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User exist already")
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      dietaryRestrictions,
      allergies,
    });

    // Save the user to the database
    await newUser.save();

    console.log("User registered succesfully")
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during registration", error });
  }
});

module.exports = router