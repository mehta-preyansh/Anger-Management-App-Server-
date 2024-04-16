const router = require('express').Router()
const User = require("../modals/user")
const bcrypt = require("bcrypt")

router.get("/", (req,res)=>{
  res.send("Anger App - Server")
})

router.post("/login", async (req,res)=>{
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    // console.log(user)
    if (!user || user==null) {
      // User not found
      return res.status(401).send({ message: 'User does not exist' });
    } 
    //Compare passwords
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    //Authentication successful
    return res.status(200).send({ message: 'Login successful', user: user, status: 200 });

  } catch (error) {
    // console.error('Error:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
})

router.post("/register", async (req,res)=>{
  const { username, password, email, mobile } = req.body;
  //Check if user already exists
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

module.exports=router