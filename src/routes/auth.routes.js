import { Router } from "express";
import { User } from "../../config/models/userModel.js";
import { createHash, isValidPassword, isValidPasswordSync } from "../utils/isValidPassword.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { requireLogin, alreadyLoggedin, requireJWT } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.get("/auth", async (_, res) => {
  res.status(200).json({ message: "hey!" });
});

// Crear un usuario
// registro local (hash con bycript)
authRouter.post("/auth/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        error: "Todos los campos son requeridos",
      });
    }
    const emailexists = await User.findOne({ email });
    if (emailexists) {
      return res.status(400).json({ error: "El email ya existe" });
    }
    // hash password
    const hash = createHash(password, 10); //

    // creacion del usuario
    const user = new User({ first_name, last_name, email, password: hash }); // enviamos el pass hasheado

    await user.save();
    res.status(201).json({
      status: "Registro exitoso 🌞",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});
// login -> bcrypt + passport
authRouter.post("/auth/login", alreadyLoggedin, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info?.message || "Credenciales inválidas 💣" });
    req.login(user, { session: true }, (err2) => {
      if (err2) return next(err2);
      req.session.user = user;
      return res.json({
        message: "Login exitoso✨(session)",
        user: user.first_name,
      });
    });
  })(req, res, next);
});

authRouter.post("/auth/logout", requireLogin, (req, res) => {
  req.logout({ keepSessionInfo: true }, (error) => {
    error && next(error);
    if (req.session) {
      req.session.destroy((err2) => {
        err2 && next(err2);
        res.clearCookie("connect.sid");
        // return res.json({ message: "See you, space cowboy"})
        return res.json({ message: "Logout exitoso. Nos vemos!🤙" });
      });
    } else {
      res.clearCookie("connect.sid");
      return res.json({ message: "Logout (sin session 😞)" });
    }
  });
});

// JWT login
authRouter.post("/auth/jwt/login", alreadyLoggedin, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.password)
    return res.status(400).json({
      error: "Credenciales inválidas 🤕",
    });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: "Credenciales inválidas 🤕" });
  const payload = { sub: String(user._id), email: user.email, role: user.role };
  const token = jwt.sign(
    payload, 
    process.env.JWT_SECRET, 
    { expiresIn: "1h" });
  // res.cookie("access_cookie", token)
  res.json({ message: "Login OK", token: token})  
});

authRouter.get("/auth/jwt/me", requireJWT, async(req, res) => {
  const user = await User.findById(req.jwt.sub).lean();
  if(!user) return res.status(404).json({ error: "No encontrado 🔍❌"});
  const { first_name, las_name, email, age, role } = user;
  res.json({ first_name, las_name, email, age, role });
})
export default authRouter;
