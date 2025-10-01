import { Router } from "express";
import { policies } from "../middleware/policies.middleware.js";
import { productController } from "../controllers/cart.controller.js";

const productrouter = Router();

productrouter.get("/", productController.get);
productrouter.get("/:id", productController.get);
productrouter.post("/", policies("admin"), productController.create);

export default productrouter;
