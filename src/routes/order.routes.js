import { Router } from "express";
import * as orderController from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.get("/", orderController.getOrders);
orderRouter.get("/:id", orderController.getOrders);
orderRouter.post("/", orderController.createOrder);
// orderRouter.put("/:id", orderController.updateOrder);
// orderRouter.delete("/:id", orderController.deleteOrder)

export default orderRouter;