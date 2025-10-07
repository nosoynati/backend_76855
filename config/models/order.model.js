import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    title: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const orderSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    buyerEmail: {
      type: String,
      required: true,
    },
    items: [orderItemsSchema],
    total: {
      type: Number,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "delivered", "cancelled"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

// 1) calcular total de la compra antes de validar
orderSchema.pre("validate", function (next) {
  try {
    const items = Array.isArray(this.items) ? this.items : [];
    this.total = items.reduce((acc, item) => {
      if (!item) return acc;
      const qty = Number(item.qty) || 0;
      const unitPrice = Number(item.unitPrice) || 0;
      
      return acc + (qty * unitPrice);
    }, 0);
    
    next();
  } catch (error) {
    next(error);
  }
});

// 2) calcular total si se actualiza cantidad
orderSchema.pre("findOneAndUpdate", function (next) {
  try {
    const update = this.getUpdate() || {};
    if (update.items) {
      const items = Array.isArray(update.items) ? update.items : [];

      update.total = items.reduce((acc, item) => {
        if (!item) return acc;
        const qty = Number(item.qty) || 0;
        const unitPrice = Number(item.unitPrice) || 0;
        
        return acc + (qty * unitPrice);
      }, 0);
      this.setUpdate(update);
    }
    
    next();
  } catch (error) {
    console.error('Error=', error);
    next(error);
  }
});
export const Order = mongoose.model("Order", orderSchema);
