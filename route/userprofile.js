const express = require("express")
const router = express.Router()
const User = require("../models/User")

router.get('/api/profile', async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, 'your-secret-key');
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({
        username: user.username,
        email: user.email,
        dietaryRestrictions: user.dietaryRestrictions,
        allergies: user.allergies,
      });
    } catch (err) {
      res.status(400).json({ message: 'Token is not valid', error: err });
    }
  });
  
  // Update User Profile Route
  router.put('/api/profile', async (req, res) => {
    const { dietaryRestrictions, allergies } = req.body;
    const token = req.headers['authorization'];
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, 'your-secret-key');
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the profile
      user.dietaryRestrictions = dietaryRestrictions;
      user.allergies = allergies;
      await user.save();
  
      res.json({ message: 'Profile updated successfully' });
    } catch (err) {
      res.status(400).json({ message: 'Error updating profile', error: err });
    }
  });
  
  module.exports = router