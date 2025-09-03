import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const homeRouter = Router();

homeRouter.get("/", (_, res) => {
  if(!res.status(200)) return res.json({ error: "Something went terribly wrong! :("});
  res.json({ message: "Hey there gorgeous"})

});

export default homeRouter;