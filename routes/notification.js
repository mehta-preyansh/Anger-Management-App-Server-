// ==============================================
// notificationRoutes.js - Handles incoming and verification of notifications
// ==============================================

import { Router } from 'express';
import User from "../modals/user.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

// Create a new Express router instance
const router = Router();

// ==========================
// @route   POST /notification
// @desc    Endpoint to handle incoming notification payloads (e.g., from external services)
// @access  Public
// ==========================
router.post("/notification", async (req, res) => {
  console.log(req.body); // Log the received payload for inspection or debugging

  // Return 204 No Content regardless of body
  res.status(204).send();
});

// ==========================
// @route   GET /notification
// @desc    Endpoint for notification service verification using a verification code
// @access  Public (should be rate-limited or secured for production)
// ==========================
router.get("/notification", async (req, res) => {
  const { verify } = req.query;

  if (verify === process.env.VERIFICATION_CODE) {
    console.log("Notification verified successfully");
    return res.status(204).send();
  } else {
    console.log("Notification verification failed");
    return res.status(404).send();
  }
});

// Export the router for use in the main application
export default router;
