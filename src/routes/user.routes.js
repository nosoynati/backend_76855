import { Router } from 'express';
import { userSchema } from '../../config/models/baseModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userRouter = Router();

userRouter.get("/:id", (req,res) => {
  const { id } = userSchema.findOne({ _id: id });
  try{
    const user = req.params?.id
    if(!user || !user.id) {
      return res.status(401).json({ error: "Oops, something exploded!"})
    }
    return res.json({ user: { user}})

  }catch(err){
    res.status(500).json({ status: "Error", error: err})
  }

})
userRouter.post("/", (req,res) => {
  
})
userRouter.put("/:id", (req,res) => {
  
})
userRouter.delete("/", (req,res) => {
  
})

export default userRouter;