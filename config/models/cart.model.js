import mongoose from "mongoose";
import { Product } from "./product.model.js";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

cartSchema.pre("validate", async function (next) {
  try {
    const items = Array.isArray(this.items) ? this.items : [];
    for (const item of items) {
      if (!item || !item.product) continue;
      const product = await Product.findById(item.product).select("stock");
      if (!product) continue;
      const qty = Number(item.qty) || 0;
      if (qty > product.stock) {
        return next(new Error("La cantidad excede el stock ⚠"));
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

export const Cart = new mongoose.model("cart", cartSchema);
