import { OrderMongoDao } from "../dao/order.mongo.dao.js";

export class OrderService {
    constructor(dao = new OrderMongoDao()){
      this.dao = dao;
    }
    async list(params){
      return await this.dao.listPaginated(params)
    };
    async get(id){
      return await this.dao.getById(id)
    };
    async getByCode(code){
      return await this.dao.getByCode(code);
    };
    async create(data){
      return await this.dao.create(data);
    };
    async update(id, data){
      return await this.dao.update(id, data);
    };
    async remove(id){
      return await this.dao.remove(id);
    };
};
export const orderService = new OrderService();