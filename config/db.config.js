import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

export const connectLocal = async () => {
  try{
    if(!MONGO_URI) throw new Error("Falta la URI de mongo :(");
    await mongoose.connect(MONGO_URI);
    console.log("Conectado exitosamente🥓✨")
  }catch(err){
    console.error(err);
    process.exit(1);
  }
  
} 
