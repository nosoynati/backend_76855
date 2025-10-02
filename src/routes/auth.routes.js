import { Router } from "express";
import * as authController from '../controllers/auth.controller.js';
import passport from "passport";
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
authRouter.post("/auth/jwt/login", authController.jwtLogin);
authRouter.get("/auth/jwt/me", requiereJwtCookie, authController.jwtSession);
authRouter.post("/auth/jwt/logout", requiereJwtCookie, authController.jwtLogout);

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
