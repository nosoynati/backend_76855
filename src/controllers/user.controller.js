import { updateUserDto } from "../dto/user.dto";
import { userService } from "../services/user.service";

export const userController = {
  getAll: async (_, res) => {
    const users = []
    try{
      const result = await userService.list();
      result.map(u => {
        users.push({
          first_name: u.first_name,
          last_name: u.last_name,
          email: u.email,
          age: u.age,
          role: u.role
        })
      })
      res.json({ users: users})
    }catch(e){
      res.status(404).json({
        status: error
      })
    }
  },
  getId: async(req,res,next) => {
    try{
      const {id }= req.params;
      if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
        Error: "El id no es válido ❌"
      });
      const { first_name, last_name, email, age, role } = await userService.getById(id)
      return u 
        ? res.json({ first_name, last_name, email, age, role }) 
        : res.status(404).json({Error: "No encontrado 🔍❌"});
    }catch(e){
      next(e)
    }
  },

  update: async(req, res, next) => {
    try{
      const { id } = req.params;
      if(!mongoose.Types.ObjectId.isValid) return res.status(400).json({ Error: "Id no válido ❌"});
      const dto = updateUserDto(req.body);
      const updt = await userService.update(id, dto)
      return updt ? res.json(updt) : res.status(404).json({ Error:"No encontrado 🔍❌" })
    }catch(e){
      next(e)
    }
  },
  delete: async(req, res, next) => {
      try{
      const { id } = req.params;
      if(!mongoose.Types.ObjectId.isValid) return res.status(400).json({ Error: "Id no válido ❌"});
      const d = await userService.delete(id)
      return d ? res.status(204).end() : res.status(404).json({ Error:"No encontrado 🔍❌" })
    }catch(e){
      next(e)
    }
  }
}