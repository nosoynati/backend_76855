import { Router } from "express";
import { User } from "../../config/models/userModel.js";
import * as authController from '../controllers/auth.controller.js';
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { requireLogin, alreadyLoggedin, requiereJwtCookie } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.get("/auth", async (_, res) => {
  res.status(200).json({ message: "Auth path ok" });
});

// Crear un usuario
// registro local (hash con bycript)
authRouter.post("/auth/register", authController.register);
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

authRouter.post("/auth/logout", requireLogin, authController.logout);

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
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("access_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 1000,
    path: "/",
  });
  res.json({ message: "Login OK (jwt) 🤙" });
});

authRouter.get("/auth/jwt/me", requiereJwtCookie, async (req, res) => {
  const user = await User.findById(req.jwt.sub).lean();
  if (!user) return res.status(404).json({ error: "No encontrado 🔍❌" });
  const { first_name, las_name, email, age, role } = user;
  res.json({ first_name, las_name, email, age, role });
});
authRouter.post("/auth/jwt/logout", (_, res) => {
  res.clearCookie("access_token", { path: "/" });
  res.json({ message: "Logout OK! Bai bai 🐱" });
});

// GITHUB AUTH
authRouter.get("/github", passport.authenticate("github", { scope: ["user: email"] }));
authRouter.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/github/fail" }),
  (req, res) => {
    req.session.user = req.user;
    res.json({ message: "Login OK (github)", user: req.user });
  }
);
authRouter.get("/github/fail", (req, res) =>
  res.status(401).json({ error: "Algo salió mal (github auth)" })
);
export default authRouter;
