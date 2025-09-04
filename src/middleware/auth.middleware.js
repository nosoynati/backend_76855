import jwt from 'jsonwebtoken';

export function requireLogin(req,res,next){
  if(!req.session.user){
    return res.status(401).json({
      error: "No autorizado 😨"
    })
  }
  next();
};

export function auth(req,res,next){
  if(req.session.user){
    return res.status(403).json({
      error: "Ya estás logeado 😅"
    })
  }
  next();
};
// auth de roles
export function requireRole(role){
  // validar que haya un usuario en la sesion
  return (req, res, next) => {
    const user = req.session?.user || req.user; // session o passport
    if(!user) return res.status(401).json({error: "No autorizado🍟"});
    if(user.role != role) return res.status(403).json({error: "Verificá tus privilegios💅"});
    next();
  }
};
export function requireJWT(req, res,next){
  const header = req.headers["authorization"] || "";
  const token = header && header.split(" ")[1];
  if(!token) return res.status(401).json({error: "No hay token🍟"});
  try {
    req.jwt = jwt.verify(token, process.env.JWT_SECRET);
    next();
  }catch(err){
    return res.status(401).json({error: "Token invalido o expirado🍟"});
  }
};