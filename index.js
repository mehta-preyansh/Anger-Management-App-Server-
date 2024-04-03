const express = require('express')
const app = express()

const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/auth')
app.use(authRoutes)

const connectDB = require('./config/db')
connectDB()

app.listen(process.env.PORT, '0.0.0.0', ()=>{
  console.log(`Server started on ${process.env.PORT}`)
})