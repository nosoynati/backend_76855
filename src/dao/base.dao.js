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
    const q = this.model.find(filter);
    
  }
}