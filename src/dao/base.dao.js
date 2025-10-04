export class BaseDao {
  constructor(model){
    this.model = model;
  }
  async create(data){
    return await this.model.create(data);
  };
  async getById(id) {
    return await this.model.findById(id).lean();
  };
  async getOne(filter = {}){
    return await this.model.findOne(filter).lean();
  };
  async getAll(filter = {}, options = {}) {
    return await this.model.find(filter);
    
  };
  async update(id,data){
    return await this.model.findOneAndUpdate(id,data);
  };
  async remove(id){
    return await this.model.remove(id);
  };
}