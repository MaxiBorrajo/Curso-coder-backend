import BaseDao from "./Base.dao.js";
import rating from "../../models/rating.js";


class RatingDao extends BaseDao {
  constructor() {
    super(rating);
  }

  async create(object) {
    try {
      let rating = await this.getByFilter({
        idUser: object.idUser,
        idProduct: object.idProduct,
      });

      if (rating) {
        rating = await this.updateById(rating._id, object);
      } else {
        rating = await super.create(object);
      }

      return rating;
    } catch (error) {
      console.error("Error en create:", error);
      throw new Error("Error al valorar producto");
    }
  }
}

export default new RatingDao();
