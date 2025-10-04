import { BaseDao } from "../dao/base.dao.js";
import { CartDao } from "../dao/cart.dao.js";
import { Service } from "./baseService.js";

export class CartService extends Service {
  constructor(dao = new CartDao()) {
    super(Service);
    this.dao = dao;
  }
  async get() {
    return await this.dao.getAll();
  }
  async getId(id) {
    return await this.dao.getById(id); // pass raw id, not wrapped
  }
  async getByUser(userId) {
  return await this.dao.getOne({ user: userId });
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
