export class Service {
    constructor(dao){
      this.dao = dao;
      // this.model = model
    }
    async get(params = {}){
      return await this.dao.getAll(params)
    };
    async getId(id){
      return await this.dao.getById(id)
    };
    async getOne(params){
      return await this.dao.getOne(params)
    }
    async create(dto){
      return await this.dao.create(dto);
    };
    async update(id, dto){
      return await this.dao.update(id, dto);
    };
    async remove(id){
      return await this.dao.remove(id);
    };
};