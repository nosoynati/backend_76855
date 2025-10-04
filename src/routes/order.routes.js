import { Router } from "express";
import cors from 'cors';
import {orderController} from '../controllers/order.controller.js';
// import { requireLogin } from "../middleware/auth.middleware.js";

const orderRouter = Router();

orderRouter.use("/view", orderController.listView.bind(orderController));
orderRouter.get("/api", orderController.getOrders.bind(orderController));
orderRouter.get("/:id", orderController.getOrders.bind(orderController));
orderRouter.post("/api", orderController.createOrder);
orderRouter.put("/:id", orderController.update);
// orderRouter.delete("/:id", orderController.deleteOrder)

export default orderRouter;