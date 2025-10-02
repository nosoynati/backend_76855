import { Cart } from "../../config/models/cart.model.js";
import { Product } from "../../config/models/product.model.js";
import { createCartDto, updateCartDto, createProductDto } from "../dto/cart.dto.js";
import { BaseDao } from "../dao/base.dao.js";
import { Service } from "../services/baseService.js";

const dao = new BaseDao(Product);
const prodService = new Service(dao)

export const productController = {
  get: async (req, res, next) => {
    let prods;
    try {
      const id = req.params?.id;
      if (!id) {
        prods = await prodService.get();
      } else {
        prods = await prodService.getId(id).lean();
      }
      return res.json({ prods: prods });
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const dto = createProductDto(req.body)
      const prod = await prodService.create(dto);
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
      const id = req.user?._id ?? req.session?.user?._id ?? req.user?.sub?._id
      const { productId, qty } = req.body;

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
      await cart.save();
      res.json({ status: "Ok!", cart });
    } catch (e) {
      next(e);
    }
  },
    get: async (req, res, next) => {
    try {
      const id = req.user?._id ?? req.session?.user?._id ?? req.user?.sub?._id;
      if(!id) return res.status(401).json({Error: "No tenés permisoss!"});
      let cart = await Cart.findOne({ user: id }).populate("items.product");
      if (!cart) return res.json({ items: []});
      res.json(cart)
    } catch (e) {
      res.status(500).json({error:e.message});
      next(e)
    }
  },
  update: async(req,res,next) => {
      try {
        
      const id = req.user?.sub._id ?? req.user?._id ?? req.user?.id;
      const { productId, qty } = req.body;
      const a = prodService.getId({ user: id})

      let cart = await Cart.findOne({ user: id });
      
      if (!cart) {
        cart = new Cart({ user: id, items: [] });
      }
      const item = cart.items.find((item) => item.product.toString() == productId);
         
      if (item) {
        item.qty = qty
      } else {
        cart.items.psuh({ product: productId, qty});
      }
      await cart.save();

      res.json({ status: "Cart actualizado!", cart });
    } catch (e) {
      next(e);
    }
  }
};
