import { Router } from "express";
import { User } from "../../config/models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userRouter = Router();
const users = [];
userRouter.get("/users", async (_, res) => {
  try {
    const result = await User.find();
    result.map((u)=> {
      users.push({
        id: u._id, 
        name: u.first_name, 
        last_name:u.last_name,
        email: u.email,
        role: u.role
      })
    })

    res.json({
      status: "success",
      payload: users
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
});
userRouter.get("/users/:id", async (req, res) => {
  try {
    const id = req.params?.id;
    const { first_name, last_name, email, role } = await User.findOne({ _id: id});
    res.send({first_name, last_name, email, role})
  } catch (err) {
    res.status(500).json({ status: "Error", error: err });
  }
});

userRouter.post("/user/create", (req, res) => {});
userRouter.put("/user/:id", (req, res) => {});
userRouter.delete("/user", (req, res) => {});
userRouter.get("/sessions/current", (req, res) => {
  //Que la estrategia "current"
  // permita extraer el usuario asociado al token JWT de manera efectiva.
});
export default userRouter;
