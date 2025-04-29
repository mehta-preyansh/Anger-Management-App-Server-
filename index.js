// ==============================================
// index.js - Main entry point for the Anger Management App server
// ==============================================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from './config/firebaseConfig.js';
import authRoutes from './routes/auth.js';
import logRoutes from './routes/angerLog.js';
import notificationRoutes from './routes/notification.js';
import fitbitRoutes from './routes/fitbit.js';
import connectDB from './config/db.js';

// Initialize Express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware for CORS (cross-origin resource sharing) to allow requests from other origins
app.use(cors());

// Middleware to parse incoming JSON payloads in requests
app.use(express.json());

// Route handling
// Use routes related to authentication, anger log, notifications, and Fitbit data
app.use(authRoutes);
app.use(logRoutes);
app.use(notificationRoutes);
app.use(fitbitRoutes);

// Connect to the database
connectDB();

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
