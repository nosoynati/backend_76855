import jwt from "jsonwebtoken";
import passport from "passport";

export function requireLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      error: "No autorizado 😨",
    });
  }
  next();
}

export function alreadyLoggedin(req, res, next) {

  if (req.session?.user || req.user || res.cookie.get("access_token")) {
    return res.status(403).json({
      error: "Ya estás logeado 😅",
    });
  }
  next();
}

export function requireJWT(req, res, next) {
  const header = req.headers["authorization"] || "";
  const token = header && header.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No hay token🍟" });
  try {
    req.jwt = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalido o expirado🍟" });
  }
}

export const requiereJwtCookie = passport.authenticate("jwt-cookie", { session: false });