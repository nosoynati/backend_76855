import { orderService } from "../services/order.service.js";
import { createOrderDto, updateOrder } from "../dto/order.dto.js";
import { cartService } from "../services/cart.service.js";
import { Product } from "../../config/models/product.model.js";
import mongoose from "mongoose";

export const orderController = {
  listView: async (req, res) => {
    try {
      let data;
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 0);
      const status = req.query.status;

      data = await orderService.list({ page, limit, status });
      res.status(200).render("orders/index", {
        title: "Ordenes",
        orders: data.items,
        pagination: { page: data.page, pages: data.pages, total: data.total, limit: data.limit },
        currentStatus: status || "all",
      });
    } catch (e) {

      res.status(500).send("Hubo un error *sadface*");
    }
  },
  getOrders: async (req, res) => {
    try {
      let data;
      const { id } = req?.params;
      if (id) {
        data = await orderService.get(id);
        res.status(200).json({ status: "Ok!", data: data });
      } else {
        data = await orderService.getAll();
        res.status(200).json({
          orders: data,
        });
      }
    } catch (e) {
      res.status(500).json({ error: "Hubo un error :(", message: e.message });
    }
  },

  createOrder: async (req, res, next) => {
    try {
      const id = req.user?._id ?? req.session?.user?._id ?? req.user?.sub?._id;
      if (!id) return res.status(401).json({ error: "No se encontró el usuario" });
      const { email, first_name } = req.session?.user;
      const cart = await cartService.getByUser(id);
      if (!cart || !cart.items || cart.items.length === 0) {
        return res.status(404).json({ error: "No hay carrito o está vacío ❌" });
      }
      
      const { code, status } = req.body;
      if (!code) return res.status(400).json({ Error: "Falta código requerido! ❌" });
      
      const orderItems = await Promise.all(
        cart.items.map(async (item) => {
          const product = await Product.findById(item.product).lean();
          return {
            productId: item.product,
            title: product?.title,
            qty: item.qty,
            unitPrice: product?.unitPrice
          };
        })
      );
      
      const dto = createOrderDto({ code, items: orderItems, status }, { email, first_name });
      const order = await orderService.create(dto);
      res.status(201).json({ status: "Ok! 🎉", order });
    } catch (e) {
      next(e);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ Error: "El id no es válido 😫" });
      const dto = updateOrder(req.body);
      const upd = await orderService.update(id, dto);
      return upd ? res.json(upd) : res.status(404).json({ Error: "No se encontró la orden 💦" });
    } catch (e) {
      next(e);
    }
  },
  deleteOrder: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid)
        return res.status(400).json({ Error: "Id no válido ❌" });
      const d = await orderService.remove(id);
      return d ? res.status(204).end() : res.status(404).json({ Error: "No encontrado 🔍❌" });
    } catch (e) {
      next(e);
    }
  },
};
