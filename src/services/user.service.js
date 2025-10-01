import { User } from "../../config/models/userModel.js";

export class UserService {
  async list() { return User.find()};
  async getById(id) { return User.findById(id) }
  async create(dto) { return User.create(dto) } // usado en auth (register)
  async update(id, dto) { return User.findByIdAndUpdate(id, dto, { new: true }) }
  async delete(id) { return !!(await User.findByIdAndDelete(id)) }
}
export const userService = new UserService();