import { Order } from "../../config/models/order.model.js";
import { orderService } from "../services/order.service.js";
import { createOrderDto, updateOrder } from "../dto/order.dto.js";

export const listView = async (req, res) => {
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
};
export const getOrders = async (req, res) => {
  try {
    let data;
    const id = req?.params?.id;
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
    res.status(500).json({ error: e.message });
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { email, first_name } = req.session?.user;
    const dto = createOrderDto(req.body, { email, first_name });
    const order = await orderService.create(dto);
    order.save();
    res.status(201).json({ status: "Ok! 🎉" });
  } catch (e) {
    next(e);
  }
};
// export const createOrder = async (req, res) => {
//   try {
//     const { first_name, email } = req?.session.user;
//     if(!email) {return res.status(400).json({ message: "Necesita iniciar sesión. Redirijirse a /api/auth/login"})};
//     const { code, items } = req.body;
//     if(!code || !items) res.status(400).json({ error: "no existe la orden "});
//     const checkOrder = await Order.findOne({ code });
//     if(checkOrder) return res.status(400).json({ error: "error"});

//     const order = new Order({
//       code,
//       items,
//       buyerName: first_name,
//       buyerEmail: email

//     })
//     await order.save();
//     res.status(201).json({
//       status: res.statusCode
//     })

//   } catch (e) {
//     res.status(400).json({
//       error: e.message,
//     });
//   }
// };
export const update = async (req, res, next) => {
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
};
export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid) return res.status(400).json({ Error: "Id no válido ❌" });
    const d = await orderService.remove(id);
    return d ? res.status(204).end() : res.status(404).json({ Error: "No encontrado 🔍❌" });
  } catch (e) {
    next(e);
  }
};
