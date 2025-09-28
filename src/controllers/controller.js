import { User } from '../../config/models/userModel.js';

class Controller {
  constructor(entity) {
    this.entity = entity;
  }
  create(){}
  read(){}
  update(){}
  delete(){}
}

export const authController = new Controller(User)
export const orderController = new Controller(Order)
