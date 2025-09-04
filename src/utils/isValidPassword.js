import bcrypt from "bcrypt";

// crea hash
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// valida pass hasheada

export const isValidPassword = (password, user) => {
  return bcrypt.compare(password, user.password);

};

export const isValidPasswordSync = (user, password) => bcrypt.compareSync(password, user.password);
