import { Order } from "../../config/models/order.model.js";
import { User } from "../../config/models/userModel.js";
import { orderService } from "../services/order.service.js";
import { createOrderDto} from "../dto/order.dto.js";


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
        pagination: { page: data.page, pages: data.pages, total: data.total, limit: data.limit},
        currentStatus: status || "all"
      })
    
  } catch (e) {
    res.status(500).send("Hubo un error *sadface*");
  }
}
export const getOrders = async (req, res) => {
  try {
    let data;
    const id = req?.params?.id;

    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 0);
    const status = req.query.status;
    if (id) {
      data = await orderService.get(id);
      res.status(200).json({ status: "Ok!", data: data });
    } else {
      data = await orderService.list({ page, limit, status });
      res.status(200).json({
        orders: data,
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const {email, first_name} = req.session?.user;
    const dto = createOrderDto(req.body, {email, first_name})
    const order = await orderService.create(dto);
    res.status(201).json({ status: "Ok! 🎉", order: order });
  } catch (e) {
    res.status(400).json({ error: "Error en order 😫",e });
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
export const updateOrder = async (req, res) => {};
export const deleteOrder = async (req, res) => {};
