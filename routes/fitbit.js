const router = require('express').Router()
const User = require("../modals/user")
const bcrypt = require("bcrypt")


router.post("/userId", async (req,res)=>{
  const { username, userId } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    //Add user id to user
    const hashedUserId = await bcrypt.hash(userId, 10);
    user.fitbitUserId = hashedUserId;
    await user.save();
    return res.status(200).send({ message: 'Fitbit user Id added to database', status: 200});
  } catch (error) {
    // console.error('Error:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
})


module.exports=router