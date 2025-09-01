import bcrypt from "bcrypt";
import * as jwt from "jswonwebtoken";

export function requireLogin (req, res, next){
  if(!req.session.user) return res.status(401).json({ message: "No autorizado"}) 
  next();
};

export function alreadyLoggedin (req, res, next){
  if (req.session.user) return res.status(403).json({ message: "Ya estás logeado!"});
  next();
};
export function requireRole  (req, res, next){
  return null;
};
export function requireToken  (req, res, next){};
