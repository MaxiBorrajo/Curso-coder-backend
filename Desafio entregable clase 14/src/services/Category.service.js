import category from "../models/category.js";
import categorized from "../models/categorized.js";
import BaseService from "./base.service.js";

class CategoryService extends BaseService {
  constructor() {
    super(category);
  }

  async getProductsByCategory(idCategory, limit = 10, page = 1, sort = 0) {
    try {
      const options = {
        page: page,
        limit: limit,
        populate: "products",
        customLabels: {
          docs: "payload",
        },
      };

      if (+sort) {
        options.sort = { price: +sort };
      }

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

      const foundProductInCategory = await categorized.find(data)

      if(foundProductInCategory){
        throw new Error("Product already in category");
      }
      
      const addedProductToCategory = await categorized.create(data)

      return addedProductToCategory
    } catch (error) {
      console.error("Error en addProductToCategory:", error);
      throw new Error("Error al añadir product a categoria");
    }
  }
}

export default new CategoryService();
