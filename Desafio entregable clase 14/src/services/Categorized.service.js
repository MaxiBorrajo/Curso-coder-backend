import categorized from "../models/categorized.js";
import BaseService from "./base.service.js";

class CategorizedService extends BaseService {
  constructor() {
    super(categorized);
  }

  async create(data) {
    try {
      const foundProductInCategory = await this.getByFilter(data);

      if (foundProductInCategory) {
        throw new Error("Product already in category");
      }

      const addedProductToCategory = await super(data);

      return addedProductToCategory;
    } catch (error) {
      console.error("Error en addProductToCategory:", error);
      throw new Error("Error al añadir product a categoria");
    }
  }

  async deleteProductFromCategory(productId, categoryId) {
    try {
      const deletedProduct = await this.model.deleteOne({
        idProduct: productId,
        idCategory: categoryId,
      });

      return deletedProduct;
    } catch (error) {
      console.error("Error en deleteProductFromCategory:", error);
      throw new Error("Error al eliminar producto de categoria");
    }
  }
}

export default new CategorizedService();
