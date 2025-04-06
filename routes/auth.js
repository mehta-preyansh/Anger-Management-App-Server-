import { Router } from 'express';
import User from "../modals/user.js";
import bcrypt from "bcrypt";

const router = Router();

router.get("/", (req,res)=>{
  res.send("Anger App - Server")
})

router.post("/login", async (req,res)=>{
  const { username, password, deviceId } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user || user==null) {
      // User not found
      return res.status(401).send({ message: 'User does not exist' });
    } 
    //Compare passwords
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    //Add device id to user
    try{
      user.deviceId.push(deviceId[0]);
      await user.save();
      return res.status(200).send({ message: 'Login successful', user: user, status: 200, deviceAdded: true});
    }
    catch(error){
      return res.status(200).send({ message: 'Login successful', user: user, status: 200, deviceAdded: false});
    }
    
    //Authentication successful

  } catch (error) {
    // console.error('Error:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
})

router.delete("/logout", async (req,res)=>{
  const { username, deviceId } = req.body;

  if (!username || !deviceId) {
    return res.status(400).send({ message: 'Username and device ID are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Update the user document to remove the specific device ID from the array
    const index = user.deviceId.indexOf(deviceId);
    if (index !== -1) {
      user.deviceId.splice(index, 1); // Remove the device ID from the array
      await user.save(); // Save the updated user document
    }

    res.status(200).send({ message: 'Device ID deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
})

router.post("/register", async (req,res)=>{
  const { username, password, email, mobile } = req.body;
  console.log(req.body)
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

export default router;