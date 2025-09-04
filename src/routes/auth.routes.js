import { Router } from 'express';
import { User } from '../../config/models/userModel.js';
import { requireLogin } from '../middleware/auth.middleware.js'; 
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import session from 'express-session';

const authRouter = Router();

authRouter.post("/auth/login", (req,res) => {
  try{

  }catch(err){
    res.status(400).json({ status: "Error", error: err})
  }

})
authRouter.post("/auth/logout", requireLogin, (req,res) => {

})
export default authRouter;