import { Router } from "express";
import { requireAuth, requireLoginOrJwt } from "../middleware/auth.middleware.js";
import { policies, validateUserPolicie } from '../middleware/policies.middleware.js';
import { userController } from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.use(requireLoginOrJwt);

userRouter.get("/users", policies("admin"), userController.getAll);
userRouter.get("/users/:id", validateUserPolicie("admin"), userController.getId);
userRouter.put("/users/:id", policies("admin"), userController.update);
userRouter.delete("/users/:id", policies("admin"), userController.delete);

userRouter.get("/sessions/current", requireAuth, (req, res) => {
  res.json({ 
    user: req.user || req.session?.user
  });
});
export default userRouter;
