import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import session from "express-session";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
const store = [];
app.use(cookieParser("secret"));
app.use(session({
  secret: "secret",
  maxAge: 60 * 60,
  saveUninitialized: true
}
))

app.get("/", (req, res) => {
  res.json({ message: "hey!"})
})

app.listen(8080, () => {
  console.log("here at http://localhost:8080")
})