export const policies = (...roles) => (req, res, next) => {
  // passport coloca el user en req.user
  if(!req.user) return res.status(401).json({ error: "No autorizado 🙅‍♀️❌"});
  if(!roles.includes(req.user.role)) return res.status(403).json({ Error: "Verificá tus privilegios💅"});
  next();
}
export const current = (req, res, next) => {
  if (!req.user && req.session && req.session.user) {req.user = req.session.user};
  if (!req.user) return res.status(401).json({ error: "No autorizado 🙅‍♀️❌"});
  const paramId = req.params && req.params.id;
  if (!paramId) return res.status(400).json({ Error: "Falta param id 🔍" });
  const userId = String(req.user._id ?? req.user.id ?? req.user);
  if (userId !== String(paramId)) return res.status(403).json({ Error: "Verificá tus privilegios💅"});
  next();
};