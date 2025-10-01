import { User } from "../../config/models/userModel.js";
import { createUserDto, updateUserDto } from "../dto/user.dto.js";
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
    // const hash = createHash(password, 10); //
    // const user = new User({ first_name, last_name, email, password: hash }); // enviamos el pass hasheado
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
