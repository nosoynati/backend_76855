import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { requiereJwtCookie } from "../middleware/auth.middleware.js";
import { validateUserPolicie } from "../middleware/policies.middleware.js";

const cartRouter = Router({mergeParams: true});

cartRouter.use(validateUserPolicie("user"));
cartRouter.post("/add", cartController.add);
cartRouter.get("/", cartController.get);
cartRouter.put("/", cartController.update);

export default cartRouter;