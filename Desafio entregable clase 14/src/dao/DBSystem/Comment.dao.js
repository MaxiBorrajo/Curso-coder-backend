import comment from "../../models/comment.js";
import BaseDao from "./Base.dao.js";
import { CustomError } from "../../utils.js";

class CommentDao extends BaseDao {
  constructor() {
    super(comment);
  }

  async create(object) {
    try {
      const foundObject = await this.getByFilter({
        idProduct: object.idProduct,
        idUser: object.idUser,
      });

      if (foundObject) {
        throw new CustomError(400, "Comment already exists");
      }

      return await super.create(object);
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
      throw error;
    }
  }
}

export default new CommentDao();
