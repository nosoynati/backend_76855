import { Order } from "../../config/models/order.model.js";
import { User } from "../../config/models/userModel.js";

class Cart {
  // items =[]
  constructor(cart){
    this.cart = []
  }
  addToCart(...items){
    if(Array.isArray(items)){
      items.forEach((i) => this.cart.push(i))
    }
    return this.cart;
  }
}
const cart = new Cart();

export const getOrder = async (req, res) => {
  try {
    const id = req?.params?.id;
    res.json({
      message: "jjj",
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
export const createOrder = async (req, res) => {
  try {
    const { first_name, email } = req?.session.user;
    if(!email) {return res.status(400).json({ message: "Necesita iniciar sesión. Redirijirse a /api/auth/login"})};
    const { code, items } = req.body;
    if(!code || !items) res.status(400).json({ error: "no existe la orden "});
    const checkOrder = await Order.findOne({ code });
    if(checkOrder) return res.status(400).json({ error: "error"});

    const order = new Order({
      code, 
      items,
      buyerName: first_name, 
      buyerEmail: email

    })
    await order.save();
    res.status(201).json({
      status: res.statusCode
    })

  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};
export const updateOrder = async (req, res) => {};
export const deleteOrder = async (req, res) => {};
/*¨
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
  }*/
