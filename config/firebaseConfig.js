// Importing the Firebase Admin SDK
import admin from 'firebase-admin'

// Importing the service account credentials (JSON file)
// ⚠️ NOTE: This file contains sensitive credentials.
// Make sure it's listed in .gitignore and never exposed publicly.
import serviceAccount from './serviceAccountKey.js'

// Initializing Firebase Admin with the service account credentials
admin.initializeApp({
  // Using the service account to authenticate with Firebase services
  credential: admin.credential.cert(serviceAccount),
})

// Exporting the initialized admin instance for use in other parts of the application
export default admin
