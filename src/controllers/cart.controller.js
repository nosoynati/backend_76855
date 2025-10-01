import { Cart } from "../../config/models/cart.model.js";
import { Product } from "../../config/models/product.model.js";

export const productController = {
  get: async (req, res, next) => {
    let prods;
    try {
      const id = req.params.id;
      if (!id) {
        prods = await Product.find();
      } else {
        prods = await Product.findById(id).lean();
      }

      return res.json({ prods: prods });
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const { title, description, unitPrice, stock } = req.body;
      const prod = await Product.create({ title, description, unitPrice, stock });
      prod.save();
      res.status(201).json({ Ok: "Creado el producto", prod });
    } catch (e) {
      next(e);
    }
  },
};

export const cartController = {
  add: async (req, res, next) => {
    try {
      const id = req.session?.user._id || req.user?._id;
      const { productId, qty } = req.body;
      if(!id){ return res.status(401).json({ error: "No tenés permisos!"})}

      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ error: "No se encontró el producto" });
      
      let cart = await Cart.findOne({ user: id });
      
      if (!cart) {
        cart = new Cart({ user: id, items: [] });
      }
      const hasItem = cart.items.find((item) => item.product.toString() == productId);
      if (hasItem) {
        hasItem.qty += qty;
      } else {
        cart.items.push({ product: productId, qty });
      }
      console.log("Cart before save:", JSON.stringify(cart, null, 2));

      await cart.save();
      res.json({ status: "Ok!", cart });
    } catch (e) {
      next(e);
    }
  },
    get: async (req, res, next) => {
    try {
      const id = req.user?._id || req.session.user?._id;
      if(!id) return res.status(401).json({Error: "No tenés permisoss!"});

      let cart = await Cart.findOne({ user: id }).populate("items.product");
      if (!cart) return res.json({ items: []});
      res.json(cart)
    } catch (e) {
      res.status(500).json({error:e.message});
      next(e)
    }
  },
};
