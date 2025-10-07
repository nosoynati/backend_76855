import passport from "passport";
import jwt from "jsonwebtoken";

export function requireLogin(req, res, next) {
  if (req.user?.sub || (req.session && req.session?.user)) {
    return next();
  }
  return res.status(401).json({
    error: "No autorizado 😨",
  });
}

export function alreadyLoggedin(req, res, next) {
  if (req.session?.user || req.user) {
    return res.status(403).json({
      error: "Ya estás logeado 😅",
    });
  }
  passport.authenticate("jwt-cookie", { session: false }, (user) => {
    if (user) {
      return res.status(403).json({ error: "Ya estás logeado 😅" });
    }
    next();
  })(req, res, next);
}

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.access_token;
  if (token) {
    try {
      const jwtoken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = jwtoken;
      return next();
    } catch (e) {
      return res.status(400).json({ Error: "Token no válido" });
    }
  } else if (!req.session ?? !req.user) {
    return res.status(401).json({ error: "no autorizado!" });
  }
  next();
};

export const requiereJwtCookie = passport.authenticate("jwt-cookie", { session: false });

export const requireLoginOrJwt = (req, res, next) => {
  if (req.session.user && req.user?.sub) {
    return next();
  }
  requiereJwtCookie(req, res, next);
};
