import bcrypt from 'bcrypt';

// crea hash
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// valida pass hasheada
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
