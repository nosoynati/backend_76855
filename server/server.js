import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

import { connectAuto } from "../config/db.config.js";
import homeRouter from "../src/routes/main.routes.js";
import userRouter from "../src/routes/user.routes.js";
import authRouter from "../src/routes/auth.routes.js";
import orderRouter from "../src/routes/order.routes.js";

import { env } from "../config/dotenv.config.js";
import initPassport from "../config/auth/passport.config.js";

import { requireLogin } from "../src/middleware/auth.middleware.js";
import logger from "../src/middleware/logger.middleware.js";

const app = express();
dotenv.config({ quiet: true});
const PORT = env.PORT || 8080;
const SECRET = env.SECRET;

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(SECRET));

const startServer = async () => {
  await connectAuto();
  const store = MongoStore.create({
    client: (await import("mongoose")).default.connection.getClient(),
    ttl: 60 * 60,
  });
  app.use(
    session({
      secret: SECRET,
      resave: false,
      saveUninitialized: true,
      store,
      cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      },
    })
  );
  // inicializar passport
  initPassport();
  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/", homeRouter);
  app.use("/api", authRouter);
  app.use("/api", requireLogin, userRouter);
  app.use("/order", orderRouter);
  app.use((_, res) => {
    res.status(400).json({
      error: "No encontrado 💣",
    });
  });

  app.listen(PORT, () => {
    console.log(`✅Live at port http://localhost:${PORT}`);
  });
};
export default startServer;