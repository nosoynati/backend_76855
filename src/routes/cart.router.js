import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { requiereJwtCookie } from "../middleware/auth.middleware.js";
import { validateUserPolicie } from "../middleware/policies.middleware.js";

const cartRouter = Router();

cartRouter.use(requiereJwtCookie,validateUserPolicie("user"));
cartRouter.post("/cart/add", cartController.add);
cartRouter.get("/cart/", cartController.get);
cartRouter.put("/cart", cartController.update);

export default cartRouter;