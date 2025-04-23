// Load environment variables from a `.env` file into process.env
import dotenv from 'dotenv'
dotenv.config()

// Constructing the Firebase service account object using environment variables
// ✅ This avoids hardcoding sensitive keys into the codebase
const serviceAccountKey = {
  type: "service_account",

  // Firebase project ID (can also be set in .env for consistency)
  project_id: "anger-management-9d8a2",

  // 🔐 Sensitive data pulled from environment variables for security
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,

  // 🔐 Firebase private key with newlines properly handled
  private_key: `-----BEGIN PRIVATE KEY-----\n${process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')}\n-----END PRIVATE KEY-----\n`,

  // Firebase admin email (can also be stored in .env)
  client_email: "firebase-adminsdk-fq7uq@anger-management-9d8a2.iam.gserviceaccount.com",

  // 🔐 Optional: client ID can also be secured in .env
  client_id: process.env.FIREBASE_CLIENT_ID,

  // Standard Firebase authentication and token URLs
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",

  // Service account certificate URL
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fq7uq%40anger-management-9d8a2.iam.gserviceaccount.com",

  // Used internally by Google APIs
  universe_domain: "googleapis.com"
}

// Exporting the constructed service account object for use in Firebase admin initialization
export default serviceAccountKey
