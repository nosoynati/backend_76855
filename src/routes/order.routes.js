import { Router } from "express";
import * as orderController from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.get("/", orderController.getOrder);
orderRouter.get("/:id", orderController.getOrder);
orderRouter.post("/", orderController.createOrder);
// orderRouter.put("/:id", orderController.updateOrder);
// orderRouter.delete("/:id", orderController.deleteOrder)

export default orderRouter;