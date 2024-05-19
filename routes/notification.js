const router = require('express').Router()
const User = require("../modals/user")
const bcrypt = require("bcrypt")
const dotenv = require('dotenv')
dotenv.config()

router.post("/notification", async (req,res)=>{
  console.log(req.body)
  res.status(204).send()
})

router.get("/notification", async (req,res)=>{
  const { verify } = req.query;
  if(verify===process.env.VERIFICATION_CODE){
    console.log("Notification sent")
    return res.status(204).send()
  }
  else{
    console.log("Notification not sent")
    return res.status(404).send()
  }
  
})

module.exports=router