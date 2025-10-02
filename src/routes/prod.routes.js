import { Router } from "express";
import { requiereJwtCookie, requireLoginOrJwt } from "../middleware/auth.middleware.js";
import { validateUserPolicie } from "../middleware/policies.middleware.js";
import { productController } from "../controllers/cart.controller.js";

const productrouter = Router();

productrouter.get("/", productController.get);
productrouter.get("/:id", productController.get);
productrouter.post("/", requiereJwtCookie, validateUserPolicie("admin"), productController.create);

export default productrouter;
