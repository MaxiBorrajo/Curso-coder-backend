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
      throw error;
    }
  }
}

export default new RatingDao();
