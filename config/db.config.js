import mongoose from "mongoose";
import dotenv from "dotenv";
import {env} from './dotenv.config.js'

dotenv.config();
const MONGO_URI = env.MONGO_URI;

export const connectLocal = async () => {
  try {
    if (!MONGO_URI) throw new Error("Falta la URI de mongo :(");
    await mongoose.connect(MONGO_URI);
    console.log("Conectado exitosamente (Local)🥓✨");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
export const connectAtlas = async () => {
  try {
    if (!MONGO_URI) throw new Error("Falta la URI de mongo :(");
    await mongoose.connect(MONGO_URI);
    console.log("Conectado exitosamente (Atlas)🥓✨");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
export const connectAuto = async() => {
  env.MONGO_TARGET == "LOCAL" ? await connectLocal() : await connectAtlas();
}