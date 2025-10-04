import { BaseDao } from "../dao/base.dao.js";
import { CartDao } from "../dao/cart.dao.js";
import { Service } from "./baseService.js";

export class CartService extends Service {
  constructor(dao = new CartDao()) {
    super(dao);
    this.dao = dao;
  }
  async get() {
    return await this.dao.getAll();
  }
  async findById(id) {
    return await this.dao.getById(id);
  }
  async getByUser(userId) {
    return await this.dao.getOneDocument({ user: userId });
  }
  async create(dto) {
    return await this.dao.create(dto);
  }
  async update(id, dto) {
    return await this.dao.update(id, dto);
  }
  async remove(id) {
    return await this.dao.remove(id);
  }
}
export const cartService = new CartService();
