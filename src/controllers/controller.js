import { User } from '../../config/models/userModel.js';

class Controller {
  constructor(entity) {
    this.entity = entity;
  }
  async create(){}
  async read(){}
  async update(){}
  async delete(){}
}

export const authController = new Controller(User)
export const orderController = new Controller(Order)
authController.create()