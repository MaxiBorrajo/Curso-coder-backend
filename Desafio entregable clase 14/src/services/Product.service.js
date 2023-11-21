import product from "../models/product.js";
import BaseService from "./base.service.js";

class ProductService extends BaseService {
  constructor() {
    super(product);
  }

  async getRecentProducts() {
    try {
      const now = Date.now();
      const week = 1000 * 60 * 60 * 24 * 7;
      const lastWeek = new Date(now - week);

      const products = await this.model
        .find({
          createdAt: { $gte: lastWeek, $lte: now },
        })
        .limit(5)
        .sort({ createdAt: -1 });

      return products;
    } catch (error) {
      throw new Error("Error al buscar productos");
    }
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
