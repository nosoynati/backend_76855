import { Router } from "express";

export default class UserRouter{
  constructor({ mergeParams=true, base = ""} = {}) {
    this.base = base;
    this.router = Router({ mergeParams });
  
  }
  use(){

  }
  get(){
    this.router.get()
  }
  post(){
    this.router.post()
  }
}

