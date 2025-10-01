import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    items: {
      type: [String],
      default: [],
    }
  },
   {
    timestamps: true,
  }
)

export const Cart = new mongoose.Model("product", cartSchema);