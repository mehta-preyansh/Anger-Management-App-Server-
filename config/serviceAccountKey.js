const dotenv = require('dotenv')
dotenv.config()
const serviceAccountKey = {
  "type": "service_account",
  "project_id": "anger-management-9d8a2",
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": `-----BEGIN PRIVATE KEY-----\n${process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')}\n-----END PRIVATE KEY-----\n`,
  "client_email": "firebase-adminsdk-fq7uq@anger-management-9d8a2.iam.gserviceaccount.com",
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fq7uq%40anger-management-9d8a2.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
module.exports = serviceAccountKey