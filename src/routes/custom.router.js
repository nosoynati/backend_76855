import { Router } from "express";

export default class customRouter {
  constructor({ mergeParams = true, base = "" } = {}) {
    this.base = base;
    this.router = Router({ mergeParams });
    this.params = this.router.param.bind(this.router);
  }
  _warp(fn){
    if(typeof fn != 'function') return fn;
    return function wrapped(req, res, next){
      try{
        const r = fn(req,res,next);
        if(r && typeof r == 'function') r.catch(next);
      }catch(e){
        next(e)
      }
    }
  }
  use(...args) {this.router.use(...args)};

  get() {
    this.router.get(path, ...handlers.map(h => this._warp(h)));
  }
  post() {
    this.router.post(path, ...handlers.map(h => this._warp(h)));
  }
  put(){
    this.router.put(path, ...handlers.map(h => this._warp(h)))
  }
  delete(){
    this.router.delete(path, ...handlers.map(h => this._warp(h)));
  }
  group(prefix, buildfn){
    const subrouter = new customRouter();
    buildfn(subrouter)
    this.router.use(prefix, subrouter.router)
  }
}
