import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import {connectLocal} from '../config/db.config.js';
import homeRouter from './routes/main.routes.js';
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    maxAge: 60 * 60,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/",homeRouter);
app.use("/api", authRouter);
app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`✅Live at port http://localhost:${PORT}`);
});
await connectLocal();