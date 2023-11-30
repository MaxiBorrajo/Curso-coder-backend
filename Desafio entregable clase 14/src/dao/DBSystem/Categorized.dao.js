import categorized from "../../models/categorized.js";
import BaseDao from "./Base.dao.js";
import { CustomError } from "../../utils.js";

class CategorizedDao extends BaseDao {
  constructor() {
    super(categorized);
  }

  async create(data) {
    try {
      const foundProductInCategory = await this.getByFilter(data);

      if (foundProductInCategory) {
        throw new CustomError(400, "Product already in category");
      }

      return super.create(data);
    } catch (error) {
      throw error;
    }
  }

  async getProductsByCategory(idCategory, page = 1) {
    try {
      const options = {
        page: page,
        limit: 10,
        populate: "idProduct",
        customLabels: {
          docs: "payload",
        },
        sort: { createdAt: 1 },
      };

      const foundObjects = await this.model.paginate(
        { idCategory: idCategory },
        options
      );

      return foundObjects;
    } catch (error) {
      throw error;
    }
  }
}

export default new CategorizedDao();
