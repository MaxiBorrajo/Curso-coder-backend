import comment from "../models/comment.js";
import BaseService from "./base.service.js";

class CommentService extends BaseService {
  constructor() {
    super(comment);
  }

  async create(object) {
    try {
      const foundObject  =await this.model.find({idProduct: object.idProduct, idUser: object.idUser});

      if(foundObject){
        throw new Error('Comment already exists')
      }
      
      const createdObject = await this.model.create(object);

      return createdObject;
    } catch (error) {
      throw error;
    }
  }

  async getCommentsOfProduct(idProduct, limit = 10) {
    try {
      const foundObjects = await this.model
        .find({ idProduct: idProduct })
        .limit(limit)
        .sort({ createdAt: -1 });

      return foundObjects;
    } catch (error) {
      console.error("Error en getCommentsOfProduct:", error);
      throw new Error("Error al obtener los comentarios del producto");
    }
  }
}

export default new CommentService();
