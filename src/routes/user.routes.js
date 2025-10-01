import { Router } from "express";
import { User } from "../../config/models/userModel.js";
import { requiereJwtCookie, requireLogin } from "../middleware/auth.middleware.js";
import { policies, current } from '../middleware/policies.middleware.js';

const userRouter = Router();

userRouter.get("/users", policies("admin"), async (_, res) => {
  try {
    const result = await User.find();
    const users = [];
    result.map((u) => {
      users.push({
        id: u._id,
        first_name: u.first_name,
        last_name: u.last_name,
        age: u.age,
        email: u.email,
        role: u.role,
      });
    });

    res.json({
      status: "Success ✨",
      payload: users,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
});
userRouter.get("/users/:id", current, async (req, res) => {
  try {
    const id = req.params?.id;
    const { first_name, last_name, age, email, role } = await User.findOne({ _id: id });
    res.json({ first_name, last_name, age, email, role });
  } catch (err) {
    res.status(500).json({ status: "Error", error: err });
  }
});

userRouter.put("/users/:id", policies("admin"), async (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, email, age, role } = req.body;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("User not found!💣");
    }
    const newUser = {
      first_name: first_name ?? user.first_name,
      last_name: last_name ?? user.last_name,
      email: email ?? user.email,
      role: role ?? user.role,
      age: age ?? user.age,
    };
    const updateData = await User.updateOne({ _id: id }, newUser);
    res.json({
      success: "success",
      payload: updateData,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
});
userRouter.delete("/users/:id", policies("admin"), async (req, res) => {
  const id = req.params.id;

  try {
    const result = await User.deleteOne({ _id: id });
    if (!result) {
      throw new Error("User not found!");
    }
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
});

userRouter.get("/sessions/current", (requireLogin || requiereJwtCookie), (req, res) => {
  res.json({
    user: req.user || req.session?.user,
  });
});
export default userRouter;
