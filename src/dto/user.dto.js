import { createHash } from "../utils/isValidPassword.js";
export function createUserDto(body) {
 
  const { first_name, last_name, age, email, password } = body ?? {};
  const hash = createHash(password, 10)
  if (!first_name || !last_name || !email || !password) {
    throw new Error("Error. Faltan campos requeridos 😿");
  }
  if (typeof age != "number") throw new Error("Tipo de dato no es válido.");
  return { first_name, last_name, age, email, password: hash };
}

export function updateUserDto(body) {
  const upd_user = {};
  if (body?.first_name) upd_user.first_name = body.first_name;
  if (body?.last_name) upd_user.last_name = body.last_name;
  if (body?.age) upd_user.age = body.age;
  if (body?.role) upd_user.role = body.role;
  return upd_user;
}
