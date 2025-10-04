import { Router } from 'express';
// import customRouter from './custom.router.js';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import cartRouter from './cart.router.js';
import productrouter from './prod.routes.js';
import orderRouter from './order.routes.js';


const router = Router({mergeParams: true});
// const routerv2 = new customRouter({mergeParams: true});

router.get("/", (_, res) => {
  res.json({ message: "Bienvenid@ 🙂"})
});
router.use("/api", authRouter);
router.use("/api", userRouter);
router.use("/products", productrouter);
router.use("/cart", cartRouter);
router.use("/orders", orderRouter)

export default router;