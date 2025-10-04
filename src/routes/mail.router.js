import { Router } from "express";
import { mailerController } from "../controllers/mail.controller.js";

const mailRouter = Router();

mailRouter.post('/api/mail/welcome',mailerController.sendWelcome);
mailRouter.post('/api/mail/order-status',mailerController.sendorderStatus);


export default mailRouter;