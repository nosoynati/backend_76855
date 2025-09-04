import { Router } from 'express';
import { User } from '../../config/models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userRouter = Router();

userRouter.get("/:id", (req,res) => {
  
  try{
    const user = req.params?.id

  }catch(err){
    res.status(500).json({ status: "Error", error: err})
  }

})
userRouter.get("/sessions/current", (req,res) => {
  //Que la estrategia "current" 
  // permita extraer el usuario asociado al token JWT de manera efectiva.
})
userRouter.post("/", (req,res) => {
  
})
userRouter.put("/:id", (req,res) => {
  
})
userRouter.delete("/", (req,res) => {
  
})

export default userRouter;