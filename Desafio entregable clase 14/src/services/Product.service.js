import product from "../models/product.js";
import BaseService from "./base.service.js";

class ProductService extends BaseService {
  constructor() {
    super(product);
  }

  async getProducts(query, limit = 10, page = 1, sort, keyword = "") {
    try {
      const options = {
        page: page,
        limit: limit,
        customLabels: {
          docs: "payload",
        },
      };

      if (+sort) {
        options.sort = sort;
      }

      let searchCriteria = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
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
      throw new Error("Error al buscar productos");
    }
  }
}

export default new ProductService();
