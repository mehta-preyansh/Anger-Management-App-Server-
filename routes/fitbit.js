// ==============================================
// fitbitRoutes.js - Associates Fitbit user ID with a user account
// ==============================================

import { Router } from 'express';
import User from "../modals/user.js";
import bcrypt from "bcrypt";

// Create a new Express router instance
const router = Router();

// ==========================
// @route   POST /userId
// @desc    Hash and store Fitbit user ID for a specific user
// @access  Public (should ideally be protected by auth)
// ==========================
router.post("/userId", async (req, res) => {
  const { username, userId } = req.body;

  try {
    // Step 1: Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Step 2: Hash the Fitbit user ID before storing
    const hashedUserId = await bcrypt.hash(userId, 10);

    // Step 3: Store the hashed ID in the user document
    user.fitbitUserId = hashedUserId;
    await user.save();

    return res.status(200).send({ message: 'Fitbit user ID added to database', status: 200 });

  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Export the router so it can be used in the main application
export default router;
