import { Router } from "express";
import { requireAuth} from "../middleware/auth.middleware.js";
import { validateUserPolicie } from "../middleware/policies.middleware.js";
import { productController } from "../controllers/cart.controller.js";

const productrouter = Router();
productrouter.use(requireAuth);
productrouter.get("/", productController.get);
productrouter.get("/:id", productController.get);
productrouter.post("/", validateUserPolicie("admin"), productController.create);

export default productrouter;
