import CommentDao from "../dao/DBSystem/Comment.dao.js";
import BaseService from "./base.service.js";

class CommentService extends BaseService {
  constructor() {
    super(CommentDao);
  }

  async getCommentsOfProduct(idProduct, limit) {
    try {
      const foundObjects = await this.dao.getCommentsOfProduct(
        idProduct,
        limit
      );

      return foundObjects;
    } catch (error) {
      console.error("Error en getCommentsOfProduct:", error);
      throw new Error("Error al obtener los comentarios del producto");
    }
  }
}

export default new CommentService();
