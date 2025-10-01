import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { policies } from "../middleware/policies.middleware.js";

const cartRouter = Router();

cartRouter.use(policies("user"));
cartRouter.post("/cart/add", cartController.add)
cartRouter.get("/cart/", cartController.get)

export default cartRouter;