import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import admin from './config/firebaseConfig.js'
import authRoutes from './routes/auth.js'
import logRoutes from './routes/angerLog.js'
import notificationRoutes from './routes/notification.js'
import fitbitRoutes from './routes/fitbit.js'
import connectDB from './config/db.js'

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())

app.use(authRoutes)
app.use(logRoutes)
app.use(notificationRoutes)
app.use(fitbitRoutes)

connectDB()

const notificationPayload = {
  notification: {
    title: 'High Heart Rate Alert!',
    body: `Your heart rate is ${100}, which exceeds the threshold.`,
  },
};

admin.messaging().send({
  token: 'edVz5fTcQfaLUB3iA8Y4v5:APA91bGZ_NheHd76In-59LB-PrjQ6cUmKlRPbAdU6v2-DlKfr8xcRx0j8aBv89goTA-GZsYBDOA8G280di1i2JCmDfud_VnIW_uXifMfX4ZaQRuMdUG61q9Zd19bdXWGFqbJp78cc7DM',
  ...notificationPayload
});

app.listen(process.env.PORT, ()=>{
  console.log(`Server started on ${process.env.PORT}`)
})

