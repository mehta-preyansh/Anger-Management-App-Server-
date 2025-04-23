// Importing required modules and dependencies
import { Router } from 'express'
import User from "../modals/user.js"
import downloadResource from '../utils/downloadResource.js'
import bcrypt from "bcrypt" // Imported but not used here—can be removed if unused
import { ObjectId } from 'mongodb'

// Create a new Express router instance
const router = Router()

// ==========================
// @route   POST /event
// @desc    Log a new anger event for a user
// @access  Public (can be secured with auth later)
// ==========================
router.post('/event', async (req, res) => {
  const username = req.body.username
  const data = req.body.details
  const { reason, startTime, endTime, date, level } = { ...data }

  const user = await User.findOne({ username })

  if (!user) {
    // ❌ User not found in DB
    return res.status(401).send({ message: 'User does not exist' })
  }

  try {
    // ✅ Construct new event and push to user's event list
    const newEvent = {
      reason,
      angerLevel: level,
      startTime,
      endTime,
      date
    }

    user.events.push(newEvent)
    await user.save()

    return res.status(201).send({ message: 'Anger log registered successfully', status: 201 })
  } catch (error) {
    // ❌ Handle internal error
    return res.status(500).send({ message: 'Error registering event', status: 500 })
  }
})

// ==========================
// @route   GET /events
// @desc    Get all anger events for a user (up to 50 entries)
// @access  Public (can be secured later)
// ==========================
router.get('/events', async (req, res) => {
  const username = req.query.username
  const user = await User.findOne({ username })

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  if (user.events.length === 0) {
    return res.status(204).json({ message: "No log events yet" })
  }

  // Return max 50 most recent events
  const events = user.events.length > 50 ? user.events.slice(0, 50) : user.events
  return res.status(200).send({ events })
})

// ==========================
// @route   DELETE /user/:userId/logs/:logId
// @desc    Delete a specific event log for a user
// @access  Public (should be protected by auth in production)
// ==========================
router.delete('/user/:userId/logs/:logId', async (req, res) => {
  const userId = req.params.userId
  const logId = req.params.logId

  try {
    const result = await User.updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { events: { _id: new ObjectId(logId) } } }
    )

    res.status(200).send(`Resource with ID ${logId} deleted successfully.`)
  } catch (error) {
    console.log(error)
    res.status(500).send("Error deleting the event log.")
  }
})

// ==========================
// @route   GET /download
// @desc    Download anger logs as a CSV file
// @access  Public
// ==========================
router.get('/download', async (req, res) => {
  const username = req.query.username
  const user = await User.findOne({ username })

  if (!user) {
    return res.status(404).send({ message: "User not found" })
  }

  const fields = [
    { label: 'Reason', value: 'reason' },
    { label: 'Anger level', value: 'angerLevel' },
    { label: 'Date', value: 'date' },
    { label: 'Start Time', value: 'startTime' },
    { label: 'End time', value: 'endTime' }
  ]

  const data = user.events

  // Util function to convert JSON to CSV and initiate download
  return downloadResource(res, `${username}.csv`, fields, data)
})

// Exporting the router to be used in main app file
export default router
