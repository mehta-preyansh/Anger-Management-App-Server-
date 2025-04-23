# Anger Management App - Backend

## Overview

The backend for the **Anger Management App** is built using **Node.js** with **Express**. The app helps users track their anger levels, log events, and send notifications. It integrates with **Firebase** for push notifications and uses **MongoDB** for persistent data storage. The app provides APIs for user authentication, event logging, Fitbit integration, and more.

## Features

- **User Authentication**: Registration, login, and logout functionality with **JWT** authentication.
- **Anger Event Logging**: Users can log events, track reasons for anger, and record anger levels.
- **Firebase Integration**: Push notifications to users regarding high heart rate or other important alerts.
- **Fitbit Integration**: (Placeholder for future Fitbit API integration).
- **CSV Export**: Users can download event logs in CSV format.
- **Device Management**: Users can manage their device IDs during login and logout.

## Technologies Used

- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework for routing and handling HTTP requests.
- **MongoDB**: Database for storing user information and event logs.
- **Firebase Admin SDK**: For sending push notifications via Firebase Cloud Messaging.
- **Bcrypt**: For password hashing and authentication.
- **json2csv**: For converting event logs into CSV format.
- **dotenv**: For managing environment variables.

## Environment Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (cloud or local instance)
- **Firebase Project** for Firebase Admin SDK configuration

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/anger-management-backend.git
   cd anger-management-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root of the project and add the following:
   ```bash
   MONGO_URL=mongodb://localhost:27017
   MONGO_DB_NAME=anger_management
   FIREBASE_PRIVATE_KEY_ID=your-firebase-private-key-id
   FIREBASE_PRIVATE_KEY=your-firebase-private-key
   FIREBASE_CLIENT_ID=your-firebase-client-id
   VERIFICATION_CODE=your-verification-code
   PORT=3000
   ```
4. Set up Firebase Admin SDK by adding your Firebase serviceAccountKey.json file and importing it in config/firebaseConfig.js.
5. If using Firebase notifications, replace the placeholder token in the server.js file with the actual Firebase device token.

### Starting the server
To start the server, follow these steps:

1. Ensure MongoDB is running (either locally or using a cloud service like MongoDB Atlas).

2. Run the following command to start the backend:
    ```bash
    npm start
3. The server will run on http://localhost:3000 (or the port specified in the .env file).