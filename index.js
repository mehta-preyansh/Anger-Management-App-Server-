const express = require('express')
const app = express()
const admin = require('./config/firebaseConfig');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/auth')
app.use(authRoutes)
const logRoutes = require('./routes/angerLog')
app.use(logRoutes)
const notificationRoutes = require('./routes/notification')
app.use(notificationRoutes)

const connectDB = require('./config/db')
connectDB()

const notificationPayload = {
  notification: {
    title: 'High Heart Rate Alert!',
    body: `Your heart rate is ${100}, which exceeds the threshold.`,
  },
};

admin.messaging().sendToDevice('edVz5fTcQfaLUB3iA8Y4v5:APA91bGZ_NheHd76In-59LB-PrjQ6cUmKlRPbAdU6v2-DlKfr8xcRx0j8aBv89goTA-GZsYBDOA8G280di1i2JCmDfud_VnIW_uXifMfX4ZaQRuMdUG61q9Zd19bdXWGFqbJp78cc7DM', notificationPayload);

app.listen(process.env.PORT, '0.0.0.0', ()=>{
  console.log(`Server started on ${process.env.PORT}`)
})