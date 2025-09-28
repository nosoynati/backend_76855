import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import { connectAuto } from "../config/db.config.js";
import homeRouter from "./routes/main.routes.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import passport from "passport";
import initPassport from "../config/auth/passport.config.js";
import MongoStore from "connect-mongo";
import { requireLogin } from "./middleware/auth.middleware.js";

const app = express();
dotenv.config({ quiet: true});
const PORT = process.env.PORT || 8080;
const SECRET = process.env.SECRET;

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
  app.use((_, res) => {
    res.status(400).json({
      error: "No encontrado 💣",
    });
  });

  app.listen(PORT, () => {
    console.log(`✅Live at port http://localhost:${PORT}`);
  });
};
await startServer();