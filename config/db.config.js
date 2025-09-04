import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const isLocal = true;

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
  isLocal ? await connectLocal() : await connectAtlas();
}