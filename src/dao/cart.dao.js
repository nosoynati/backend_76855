import { Cart } from '../../config/models/cart.model.js';
import { BaseDao } from './base.dao.js';

export class CartDao extends BaseDao{
  constructor(){
    super(Cart);
  };

  async create(dto){
    return await this.dao.create(dto)
  }
}
