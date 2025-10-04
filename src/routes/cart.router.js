import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { requireLoginOrJwt } from "../middleware/auth.middleware.js";
import { policies } from "../middleware/policies.middleware.js";

const cartRouter = Router({mergeParams: true});

// cartRouter.use(requireLoginOrJwt);
cartRouter.post("/add", cartController.add);
cartRouter.get("/", cartController.get);
cartRouter.put("/", cartController.update);

export default cartRouter;