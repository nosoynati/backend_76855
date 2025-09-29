import { Router } from 'express';
import customRouter from './custom.router.js';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import { policies } from '../middleware/policies.middleware.js';
import orderRouter from './order.routes.js';
import { requireLogin } from '../middleware/auth.middleware.js';

const homeRouter = Router();
const routerv2 = new customRouter();

// router.params.


homeRouter.get("/", (_, res) => {
  if(!res.status(200)) return res.json({ error: "Algo salió terriblemente mal! 😨"});
  res.json({ message: "Bienvenid@ 🙂"})

});
homeRouter.use("/api", authRouter)
homeRouter.use("/api", policies("admin", "user"), userRouter)

export default homeRouter;