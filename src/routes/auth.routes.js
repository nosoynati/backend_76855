import { Router } from "express";
import { User } from "../../config/models/userModel.js";
import * as authController from '../controllers/auth.controller.js';
import jwt from "jsonwebtoken";
import passport from "passport";
import bcrypt from "bcrypt";
import { requireLogin, alreadyLoggedin, requiereJwtCookie } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.get("/auth", async (_, res) => {
  res.status(200).json({ message: "Auth path ok" });
});
// registro local // login -> bcrypt + passport
authRouter.post("/auth/register", authController.register);
authRouter.post("/auth/login", alreadyLoggedin, authController.login);
authRouter.post("/auth/logout", requireLogin, authController.logout);

// JWT login
authRouter.post("/auth/jwt/login", requiereJwtCookie, async (req, res) => {
  const { email, password } = req.body;  
  const user = await User.findOne({ email });
  if (!user || !user.password)
    return res.status(401).json({
      error: "Credenciales inválidas ❌",
    });
  
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Credenciales inválidas ❌" });
  
  const payload = { sub: String(user._id), email: user.email, role: user.role };
  console.log(req)
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
  try{
    const id = req.user.sub || req.user._id || req.user.id;
    const user = await User.findById(id).lean();
     if (!user) return res.status(404).json({ error: "No encontrado 🔍❌" });
    const { first_name, last_name, email, age, role } = user;
    res.json({ first_name, last_name, email, age, role });
  }catch(e){
    res.status(500).json({ error: "Algo explotó 💣" });
  }  
});

authRouter.post("/auth/jwt/logout", requiereJwtCookie, requireLogin, (_, res) => {
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
