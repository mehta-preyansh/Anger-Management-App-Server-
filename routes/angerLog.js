const router = require('express').Router()
const User = require("../modals/user")
const bcrypt = require("bcrypt")

router.post('/event', async (req, res)=>{
  const username = req.body.username
  const data = req.body.details
  const {reason, date, level} = {...data}

  // console.log(reason, level, date)
  const user = await User.findOne({ username });

  if (!user || user==null) {
    // User not found
    return res.status(401).send({ message: 'User does not exist' });
  } 
  else{
    //Register log in the log array
    try {
      const newEvent = {
        reason,
        angerLevel: level,
        date
      }
      user.events.push(newEvent)
      await user.save()
      // console.log("Success")
      return res.status(201).send({ message: 'Anger log registered successfully', status: 201 });
      
    } catch (error) {
      // console.log("Error")
      return res.status(500).send({ message: 'Error registering event', status: 500 });
    }
  }
})

router.get('/event', async (req, res)=>{
  const username = req.query.username
  const user = await User.findOne({ username });
  if(user.events.length===0){
    res.status(204).json({message: "No log events yet"})
  }
  else{
    res.status(200).send({events: user.events.length > 50 ? dataArray.slice(0, 50) : user.events})
  }
})

// router.put('/event')

// router.delete('/event')

module.exports = router