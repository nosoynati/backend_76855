import passport from "passport";
import jwt from 'jsonwebtoken';

export function requireLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      error: "No autorizado 😨",
    });
  }
  next();
}

export function alreadyLoggedin(req, res, next) {
  if (req.session?.user || req.user) {
    return res.status(403).json({
      error: "Ya estás logeado 😅",
    });
  }
  next();
}

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.access_token;
  if (token) {
    try {
      const jwtoken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = jwtoken;
      return next();
    } catch (e) {
      return res.status(400).json({Error: "Token no válido"})
    }
  };
  if (req.session?.user) {
    req.user = req.session.user;
    return next();
  }
  
  return res.status(401).json({ 
    Error: "No autorizado ❌💀" 
  });
};

export const requiereJwtCookie = passport.authenticate("jwt-cookie", { session: false });

export const requireLoginOrJwt = (req, res, next) => {
  requireLogin(req, res, (err) => {
    if (!err) return next();
    requiereJwtCookie(req, res, (err2) => {
      if (!err2) return next();
      res.status(401).json({ Error: "No autorizado ❌💀", messgae: err2?.messgae });
    });
  });
};
