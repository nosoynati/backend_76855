import passport from "passport";

export function requireLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      error: "No autorizado 😨",
    });
  }
  next();
};

export function alreadyLoggedin(req, res, next) {
  if (req.session?.user || req.user) {
    return res.status(403).json({
      error: "Ya estás logeado 😅",
    });
  }
  next();
};

// export const requireJWT = (req, res, next) =>{
//   const header = req.headers["authorization"] || "";
//   const token = header && header.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "No hay token🍟" });
//   try {
//     const jwt = jwt.verify(token, process.env.JWT_SECRET);
//     req.jwt = jwt;
//     req.user = jwt;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Token invalido o expirado🍟" });
//   }
// }
export const requireAuth = (req, res, next) => {
  const token = req.cookies?.access_token;
  if (token) {
    try {
      const jwt = jwt.verify(token, process.env.JWT_SECRET);
      req.jwt = jwt;
      req.user = jwt;
      return next();
    } catch (e) {
      res.status(401).json({ Error: "No autorizado ❌💀", messgae: e.messgae});
    }
  };
  if (req.session && req.session?.user) {
    req.user = req.session.user;
    return next();
  }
  return res.status(401).json({ Error: "No autorizado ❌💀",  messgae: e.messgae});
};

export const requiereJwtCookie = passport.authenticate("jwt-cookie", { session: false });

export const requireLoginOrJwt = (req, res, next) => {
  requireLogin(req, res, (err) => {
    if (!err) return next();
    requiereJwtCookie(req, res, (err2) => {
      if (!err2) return next();
      res.status(401).json({ Error: "No autorizado ❌💀",  messgae: e.messgae});
    });
  });
};
