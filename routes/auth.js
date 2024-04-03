const router = require('express').Router()
const User = require("../modals/user")
const bcrypt = require("bcrypt")

router.post("/login", async (req,res)=>{
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    // console.log(user)
    if (!user || user==null) {
      // User not found
      return res.status(401).json({ message: 'User does not exist' });
    } 
    //Compare passwords
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    //Authentication successful
    return res.status(200).json({ message: 'Login successful', user: user, status: 200 });

  } catch (error) {
    // console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

router.post("/register", async (req,res)=>{
  const { username, password, email, mobile } = req.body;
  //Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(400).json({ message: 'Email or username already in use' });
  }
  try {
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new User({ email, password: hashedPassword, username, mobile });
    //Save user
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully', status: 201 });
  } catch (error) {
    // console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

module.exports=router