import { Router } from "express";
import { mailerController } from "../controllers/mail.controller.js";

const mailRouter = Router();

mailRouter.post('/mail/welcome',mailerController.sendWelcome);
mailRouter.post('/mail/order-status',mailerController.sendorderStatus);


export default mailRouter;