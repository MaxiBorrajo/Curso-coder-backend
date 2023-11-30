import product from "../../models/product.js";
import BaseDao from "./Base.dao.js";

class ProductDao extends BaseDao {
  constructor() {
    super(product);
  }

  async getProducts(query, limit = 10, page = 1, sort, order, keyword = "") {
    try {
      const options = {
        page: page,
        limit: limit,
        customLabels: {
          docs: "payload",
        },
      };
      if (sort && order) {
        options.sort = { [sort]: order };
      }

      let searchCriteria = {
        $or: [
          { title: { $regex: keyword, $options: "i" } }
        ],
      };

      if (query) {
        const additionalQuery = JSON.parse(query);
        searchCriteria = {
          $and: [searchCriteria, additionalQuery],
        };
      }

      const foundObjects = await this.model.paginate(searchCriteria, options);
      
      return foundObjects;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductDao();
