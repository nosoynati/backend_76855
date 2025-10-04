import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

import { connectAuto } from "../config/db.config.js";
import router from "../src/routes/main.routes.js";

import initPassport from "../config/auth/passport.config.js";
import cors from 'cors';
import logger from "../src/middleware/logger.middleware.js";

// hbs
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { hbsHelpers } from "../src/utils/hbs.helpers.js";

const app = express();
dotenv.config({ quiet: true });
const PORT = process.env.PORT || 8080;
const SECRET = process.env.SECRET;

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(SECRET));
app.use(cors({
  credentials: false
})
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      saveUninitialized: false,
      store,
      cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      },
    })
  );
  app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../views/layouts'),
    helpers: hbsHelpers
  }))
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, '../views'));
  // inicializar passport
  initPassport();
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/", router);

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