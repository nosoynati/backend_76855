import { User } from "../../config/models/userModel.js";
import { createUserDto} from "../dto/user.dto.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";
import { userService } from "../services/user.service.js";

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        error: "Todos los campos son requeridos",
      });
    }
    const emailexists = await User.findOne({ email });
    if (emailexists) {
      return res.status(400).json({ error: "El email ya existe" });
    }
    const dto = createUserDto(req.body);
    const user = await userService.create(dto);
    await user.save();
    res.status(201).json({
      status: "Registro exitoso 🌞",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      Error: error.message,
    });
  }
};
export const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info?.message || "Credenciales inválidas 💣" });
    req.login(user, { session: true }, (err2) => {
      if (err2) return next(err2);
      req.session.user = user;
      return res.json({
        message: "Login exitoso✨(session)",
        user: user.first_name,
      });
    });
  })(req, res, next);
};
export const logout = async (req, res, next) => {
  req.logout({ keepSessionInfo: true }, (error) => {
    error && next(error);
    if (req.session) {
      req.session.destroy((err2) => {
        err2 && next(err2);
        res.clearCookie("connect.sid");
        res.clearCookie("access_token");
        // return res.json({ message: "See you, space cowboy"})
        return res.json({ message: "Logout exitoso. Nos vemos!🤙" });
      });
    } else {
      res.clearCookie("connect.sid");
      res.clearCookie("access_token", { path: "/" });
      return res.json({ message: "Logout (sin session 😞)" });
    }
  });
};
export const jwtLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.password)
    return res.status(401).json({
      error: "Credenciales inválidas ❌",
    });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Credenciales inválidas ❌" });

  const payload = { sub: String(user._id), email: user.email, role: user.role };
  console.log(req);
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.cookie("access_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 1000,
    path: "/",
  });

  res.json({ message: "Login OK (jwt) 🤙" });
};
export const jwtSession = async (req, res) => {
  try {
    const id = req.user.sub || req.user._id || req.user.id;
    const user = await User.findById(id).lean();
    if (!user) return res.status(404).json({ error: "No encontrado 🔍❌" });
    const { first_name, last_name, email, age, role } = user;
    res.json({ first_name, last_name, email, age, role });
  } catch (e) {
    res.status(500).json({ error: "Algo explotó 💣" });
  }
};
export const jwtLogout = async (_, res) => {
  res.clearCookie("access_token", { path: "/" });
  res.json({ message: "Logout OK! Bai bai 🐱" });
}