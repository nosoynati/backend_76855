import { Router } from 'express';
import customRouter from './custom.router.js';

const homeRouter = Router();
const router = new customRouter();

// router.params.


homeRouter.get("/", (_, res) => {
  if(!res.status(200)) return res.json({ error: "Algo salió terriblemente mal! 😨"});
  res.json({ message: "Bienvenid@ 🙂"})

});


export default homeRouter;