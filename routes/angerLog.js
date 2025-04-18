import { Router } from 'express';
import User from "../modals/user.js";
import downloadResource from '../utils/downloadResource.js';
import bcrypt from "bcrypt";
import { ObjectId } from 'mongodb';

const router = Router();

router.post('/event', async (req, res) => {
  const username = req.body.username
  const data = req.body.details
  const { reason, startTime, endTime, date, level } = { ...data }

  // console.log(reason, level, date)
  const user = await User.findOne({ username });

  if (!user || user == null) {
    // User not found
    return res.status(401).send({ message: 'User does not exist' });
  }
  else {
    //Register log in the log array
    try {
      const newEvent = {
        reason,
        angerLevel: level,
        startTime,
        endTime,
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

router.get('/events', async (req, res) => {
  const username = req.query.username;
  const user = await User.findOne({ username });
  console.log(user)
  if (user && user.events.length === 0) {
    res.status(204).json({ message: "No log events yet" })
  }
  else {
    res.status(200).send({ events: user.events.length > 50 ? dataArray.slice(0, 50) : user.events })
  }
})

router.delete('/user/:userId/logs/:logId', async (req, res) => {
  const userId = req.params.userId;
  const logId = req.params.logId;
  console.log(userId, logId)
  try {
    const result = await User.updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { events: { _id: new ObjectId(logId) } } }
    );
    console.log(result)
    res.status(200).send(`Resource with ID ${logId} deleted successfully.`);
  } catch (error) {
    console.log(error)
  }
})

router.get('/download', async (req, res) => {
  const username = req.query.username;
  const user = await User.findOne({ username });
  const fields = [
    {
      label: 'Reason',
      value: 'reason'
    },
    {
      label: 'Anger level',
      value: 'angerLevel'
    },
    {
     label: 'Date',
      value: 'date'
    },
    {
     label: 'Start Time',
      value: 'startTime'
    },
    {
     label: 'End time',
      value: 'endTime'
    }
  ];
  const data = user.events
  console.log(data)
  return downloadResource(res, `${username}.csv`, fields, data);
 })

export default router;