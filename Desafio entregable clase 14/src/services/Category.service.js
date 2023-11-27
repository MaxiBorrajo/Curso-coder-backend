import category from "../repositories/category.js";
import categorized from "../repositories/categorized.js";
import BaseService from "./base.service.js";

class CategoryService extends BaseService {
  constructor() {
    super(category);
  }

  async getAll(filter, keyword = "") {
    try {
      if (keyword) {
        let searchCriteria = {
          $or: [{ category: { $regex: keyword, $options: "i" } }],
        };

        filter = {
          $and: [filter, searchCriteria],
        };
      }

      return super.getAll(filter);
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

      const foundObjects = await categorized.paginate(
        { idCategory: idCategory },
        options
      );

      return foundObjects;
    } catch (error) {
      console.error("Error en getProductsByCategory:", error);
      throw new Error("Error al obtener los productos por categoria");
    }
  }

  async addProductToCategory(data) {
    try {
      const foundProductInCategory = await categorized.find(data);

      if (foundProductInCategory) {
        throw new Error("Product already in category");
      }

      const addedProductToCategory = await categorized.create(data);

      return addedProductToCategory;
    } catch (error) {
      console.error("Error en addProductToCategory:", error);
      throw new Error("Error al añadir product a categoria");
    }
  }
}

export default new CategoryService();
