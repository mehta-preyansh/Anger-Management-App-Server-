// ==============================================
// authRoutes.js - Handles registration, login, and logout
// ==============================================

// Import required modules
import { Router } from 'express'
import User from "../modals/user.js"
import bcrypt from "bcrypt"

// Create an Express Router instance
const router = Router()

// ==========================
// @route   GET /
// @desc    Default root endpoint (server check)
// @access  Public
// ==========================
router.get("/", (req, res) => {
  res.send("Anger App - Server")
})

// ==========================
// @route   POST /login
// @desc    Authenticate user, attach device ID
// @access  Public (can be protected with rate limiting or CAPTCHA)
// ==========================
router.post("/login", async (req, res) => {
  const { username, password, deviceId } = req.body

  try {
    // Find user by username
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).send({ message: 'User does not exist' })
    }

    // Compare passwords using bcrypt
    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (!passwordsMatch) {
      return res.status(401).send({ message: 'Invalid credentials' })
    }

    // Add new device ID to user's record (first index assumed)
    try {
      user.deviceId.push(deviceId[0])
      await user.save()
      return res.status(200).send({ message: 'Login successful', user, status: 200, deviceAdded: true })
    } catch (error) {
      // ✅ Login succeeds even if device ID couldn't be saved
      return res.status(200).send({ message: 'Login successful', user, status: 200, deviceAdded: false })
    }

  } catch (error) {
    // Internal error
    res.status(500).send({ message: 'Internal server error' })
  }
})

// ==========================
// @route   DELETE /logout
// @desc    Removes the current device ID from user's list
// @access  Public (ideally, secure with auth token)
// ==========================
router.delete("/logout", async (req, res) => {
  const { username, deviceId } = req.body

  if (!username || !deviceId) {
    return res.status(400).send({ message: 'Username and device ID are required' })
  }

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    // Remove the device ID from user's list
    const index = user.deviceId.indexOf(deviceId)
    if (index !== -1) {
      user.deviceId.splice(index, 1)
      await user.save()
    }

    res.status(200).send({ message: 'Device ID deleted successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Server error', error })
  }
})

// ==========================
// @route   POST /register
// @desc    Create a new user account
// @access  Public
// ==========================
router.post("/register", async (req, res) => {
  const { username, password, email, mobile } = req.body
  console.log(req.body) // ✅ For debugging; remove or guard with NODE_ENV in production

  // Check for existing user with same email or username
  const existingUser = await User.findOne({ $or: [{ email }, { username }] })
  if (existingUser) {
    return res.status(400).send({ message: 'Email or username already in use' })
  }

  try {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create and save a new user document
    const newUser = new User({ email, password: hashedPassword, username, mobile })
    await newUser.save()

    return res.status(201).send({ message: 'User registered successfully', status: 201 })
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' })
  }
})

// Export the router to be used in your main app
export default router
