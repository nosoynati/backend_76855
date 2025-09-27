import mongoose from "mongoose"
 
const orderItemsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product"
  },
  title: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true,
    min: 1
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  }
},{_id: false})

const orderSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  buyerName: {
    type: String,
    required: true
  },
  buyerEmail:{
    type: String,
    required: true
  },
  items: {
    type: [orderItemsSchema], default: []
  },
  total: {
    type: Number,
    min: 0,
    default: 0
  },
  status:{
    type: String,
    enum: ["pending","paid","delivered","cancelled"],
    default: "pending",
    index: true
  }
}, { timestamps: true})
 
// 1) calcular total de la compra antes de validar
orderSchema.pre("validate", function(next){
  const items = Array.isArray(this.items) ? this.items : [];
  this.total = items.reduce((acc, it) => acc + (Number(it.qty || 0) * Number(it.unitPrice || 0)));
  next();
})

// 2) calcular total si se actualiza cantidad
orderSchema.pre("findOneAndUpdate", function(next) {
  const update = this.getUpdate || [];
  // si vienen items en el update recalcular total
  if(update.items){
    const items = Array.isArray(update.items) ? update.items : [];
    update.total = items.reduce((acc, it) => acc + (Number(it.qty || 0) * Number(it.unitPrice || 0)))
    this.setUpdate(update);
  }
  next();
})
export const Order = mongoose.model("Order", orderSchema);