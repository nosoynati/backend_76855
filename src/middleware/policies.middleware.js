export const policies = (...roles) => (req, res, next) => {
  // passport coloca el user en req.user
  if(!req.user) return res.status(401).json({ error: "No autorizado 🙅‍♀️❌"});
  if(!roles.includes(req.user.role)) return res.status(403).json({ error: "Error. Verificá tus privilegios💅"});
  console.info(req.user.roles || req.user)
  next();
}