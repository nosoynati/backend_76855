import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_TARGET: process.env.MONGO_TARGET,
  SECRET:process.env.SECRET,
  JWT_SECRET: process.env.JWT_SECRET

}
export const validateEnv = () => {
  const missing = [];

}
export const getPublicEnv = () => {
  return {
    NODE_ENV: env.NODE_ENV,
    PORT: env.PORT,
    MONGO_TARGET: env.MONGO_TARGET
  }
}