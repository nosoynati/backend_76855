import { Router } from "express";
import {orderController} from '../controllers/order.controller.js';
import { requireLogin, requireLoginOrJwt, requireAuth } from "../middleware/auth.middleware.js";

const orderRouter = Router();
orderRouter.use(requireLoginOrJwt); // no funciona en navegador
orderRouter.get("/view", orderController.listView);
orderRouter.get("/api", orderController.getOrders);
orderRouter.get("/api/:id", orderController.getOrders);
orderRouter.post("/api", orderController.createOrder);
orderRouter.put("/api/:id", orderController.update);
orderRouter.delete("/api/:id", orderController.deleteOrder)

export default orderRouter;