export function createUserDto(body) {
  const { first_name, last_name, age, email, password } = body ?? {};
  if (!first_name || !last_name || !email || !password) {
    throw new Error("Missing required data");
  }
  if (typeof age != "number") throw new Error("Invalid datatype");
  return { first_name, last_name, age, email, password };
}

export function updateUserDto(body) {
  const upd_user = {};
  if (body?.first_name) upd_user.first_name = body.first_name;
  if (body?.last_name) upd_user.last_name = body.last_name;
  if (body?.age) upd_user.age = body.age;
  return upd_user;
}
