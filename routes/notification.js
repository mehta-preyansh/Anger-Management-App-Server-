const router = require('express').Router()
const User = require("../modals/user")
const bcrypt = require("bcrypt")
const dotenv = require('dotenv')
dotenv.config()

router.post("/notification", async (req,res)=>{
  const { updates } = req.body;
  //Check if user already exists
  console.log(updates)
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(400).send({ message: 'Email or username already in use' });
  }
  try {
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new User({ email, password: hashedPassword, username, mobile });
    //Save user
    await newUser.save();
    return res.status(201).send({ message: 'User registered successfully', status: 201 });
  } catch (error) {
    // console.error('Error:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
})

router.get("/notification", async (req,res)=>{
  const { verify } = req.query;
  if(verificationCode===process.env.VERIFICATION_CODE){
    console.log("Notification sent")
    return res.status(204).send()
  }
  else{
    console.log("Notification not sent")
    return res.status(404).send()
  }
  
})

module.exports=router