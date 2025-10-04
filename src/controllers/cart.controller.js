import { Cart } from "../../config/models/cart.model.js";
import { Product } from "../../config/models/product.model.js";
import { createProductDto, createCartDto, addProduct } from "../dto/cart.dto.js";
import { BaseDao } from "../dao/base.dao.js";
import { cartService } from "../services/cart.service.js";
import { Service } from "../services/baseService.js";


const productDao = new BaseDao(Product);
const prodService = new Service(productDao);

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
      const dto = createProductDto(req.body);
      const prod = await prodService.create(dto);
      prod.save();
      res.status(201).json({ Ok: "Creado el producto", prod });
    } catch (e) {
      next(e);
    }
  },
};
// cart controlelr
export const cartController = {
  add: async (req, res, next) => {
    try {
      const id = req.user?._id ?? req.session?.user?._id ?? req.user?.sub?._id;
      const { productId, qty } = req.body;
      const product = await prodService.getId(productId);
      if (!product) return res.status(404).json({ error: "No se encontró el producto" });
      
      let cart = await cartService.getByUser(id);
      
      if (!cart) {
        const dto = createCartDto(req.body, { id });
        cart = await cartService.create(dto);
      } else {
        addProduct(productId, cart, qty);
        await cart.save();
      }

      res.json({ status: "Ok!", cart });
    } catch (e) {
      next(e);
    }
  },
  get: async (req, res, next) => {
    try {
      const id = req.user?._id ?? req.session?.user?._id ?? req.user?.sub?._id;
      if (!id) return res.status(401).json({ Error: "No tenés permisoss!" });

      let cart = await cartService.getByUser(id);

      if (!cart) return res.json({ items: [] });
      res.json(cart);
    } catch (e) {
      res.status(500).json({ error: e.message });
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.user?._id ?? req.session?.user?._id ?? req.user?.sub?._id;
      const { productId, qty } = req.body;

      let cart = await cartService.getByUser(id);
      // if (!cart) {
      //   cart = await cartService.create({ user: id, items: [] });
      // }
      const item = cart.items.find((item) => item.product.toString() == productId);

      if (item) {
        item.qty = qty;
      } else {
        cart.items.push({ product: productId, qty });
      }
      await cart.save();

      res.json({ status: "Cart actualizado!", cart });
    } catch (e) {
      next(e);
    }
  },
};
