import { Router } from 'express';
// import customRouter from './custom.router.js';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import { policies } from '../middleware/policies.middleware.js';
import cartRouter from './cart.router.js';
import productrouter from './prod.routes.js';


const homeRouter = Router({mergeParams: true});
// const routerv2 = new customRouter({mergeParams: true});

homeRouter.get("/", (_, res) => {
  res.json({ message: "Bienvenid@ 🙂"})
});
homeRouter.use("/api", authRouter);
homeRouter.use("/api", userRouter);
homeRouter.use("/products", productrouter);
homeRouter.use("/", cartRouter);

export default homeRouter;