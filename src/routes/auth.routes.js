import { Router } from "express";
import { User } from "../../config/models/userModel.js";
import { createHash } from "../utils/isValidPassword.js";
import { requireLogin, alreadyLoggedin } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.get("/auth", async (_, res) => {
  res.status(200).json({ message: "hey!" });
});

// Crear un usuario
// registro local (hash con bycript)
authRouter.post("/auth/register", async (req, res) => {
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
    // hash password
    const hash = createHash(password, 10); //

    // creacion del usuario
    const user = new User({ first_name, last_name, email, password: hash }); // enviamos el pass hasheado

    await user.save();
    res.status(201).json({
      status: "Registro exitoso 🌞",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export default authRouter;
