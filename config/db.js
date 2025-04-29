// Importing the mongoose library to interact with MongoDB
import mongoose from 'mongoose'

// Async function to establish a MongoDB connection
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using environment variables
    await mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}`)

    // ✅ Connected successfully
    // NOTE: For production, avoid logging internal hostnames or sensitive info.
    // Uncomment the line below for debugging during development:
    console.log(`Connected to database! - ${mongoose.connection.host}`)
  } catch (e) {
    // ❌ Connection failed
    // NOTE: In production, avoid logging full error details. Log a generic message instead.
    // Uncomment the line below for debugging during development:
    console.log(`Error establishing connection - ${e}`)

    // Production-safe log message
    // console.log("Database connection failed.")
  }
}

// Exporting the connection function so it can be used in other parts of the app
export default connectDB
