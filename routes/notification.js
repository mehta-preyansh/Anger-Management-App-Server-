import { Router } from 'express';
import User from "../modals/user.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

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

export default router;