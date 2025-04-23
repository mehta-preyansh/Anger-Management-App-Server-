// Importing mongoose for MongoDB object modeling
import mongoose from "mongoose"

// ===================== Event Subdocument Schema =====================
// This schema represents an individual anger-related event.
// It will be embedded in the `User` schema as a subdocument.
const eventSchema = new mongoose.Schema({
  reason: {
    type: String,           // Reason for the anger event
    required: true          // Mandatory field
  },
  angerLevel: {
    type: Number,           // Severity of anger on a scale
    required: true,         // Mandatory field
    min: 1,                 // Minimum value allowed
    max: 10                 // Maximum value allowed
  },
  startTime: {
    type: Date,             // When the anger event started
    default: Date.now       // Default to current time
  },
  endTime: {
    type: Date,             // When the anger event ended
    default: Date.now       // Default to current time
  },
  date: {
    type: Date,             // Date of the event
    default: Date.now       // Default to current date
  }
})

// ===================== User Schema =====================
// This is the primary schema that represents each registered user.
// It contains basic user information and a list of anger-related events.
const User = mongoose.model('User', new mongoose.Schema({
  username: {
    type: String,
    required: true,         // Every user must have a username
    unique: true            // No duplicate usernames allowed
  },
  email: {
    type: String,
    required: true,         // Email is required
    unique: true            // Must be unique in the database
  },
  password: {
    type: String,
    required: true          // Store hashed password (never store plain text!)
  },
  mobileNumber: {
    type: String            // Optional mobile number
  },
  events: [eventSchema],    // Array of anger event subdocuments

  deviceId: {
    type: [String],         // List of associated device IDs
  },

  fitbitUserId: {
    type: String            // Optional Fitbit user ID for tracking data
  }
}))

// Exporting the User model so it can be used elsewhere in the app
export default User
