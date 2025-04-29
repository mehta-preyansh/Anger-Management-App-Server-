// ==============================================
// notificationRoutes.js - Handles incoming and verification of notifications
// ==============================================

import { Router } from 'express';
import dotenv from 'dotenv';
import admin from '../config/firebaseConfig.js';
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

// ==========================
// @route   POST /notification/send
// @desc    Endpoint to send notifications to specific users
// @access  Public
// @body    { deviceToken: string, title: string, body: string, data?: object }
// ==========================
router.post("/notification/send", async (req, res) => {
  try {
    const { deviceToken, title, body, data } = req.body;

    // Validate required fields
    if (!deviceToken || !title || !body) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: deviceToken, title, and body are required"
      });
    }

    // Create the notification message
    const message = {
      token: deviceToken,
      notification: {
        title: title,
        body: body
      },
      data: data || {},
      android: {
        priority: 'high',
        notification: {
          sound: 'custom_sound',
          channelId: 'angerApp'
        }
      }
    };

    // Send the notification
    const response = await admin.messaging().send(message);
    
    return res.status(200).json({
      success: true,
      message: "Notification sent successfully",
      response: response
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send notification",
      error: error.message
    });
  }
});

// Export the router for use in the main application
export default router;
