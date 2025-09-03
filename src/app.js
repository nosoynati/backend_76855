import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import userRouter from "./routes/user.routes";

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

app.get("/", (_, res) => {
  res.json({ message: "hey!" });
});

app.get("/user", userRouter);

app.listen(PORT, () => {
  console.log(`✅Live at port http://localhost:${PORT}`);
});
