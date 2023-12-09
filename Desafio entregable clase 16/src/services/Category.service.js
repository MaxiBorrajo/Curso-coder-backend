import CategoryDao from "../dao/DBSystem/Category.dao.js";
import { CustomError } from "../utils.js";
import BaseService from "./base.service.js";
import ProductService from "./Product.service.js";

class CategoryService extends BaseService {
  constructor() {
    super(CategoryDao);
  }

  async addProductToCategory(object) {
    try {
      const foundCategory = await this.getById(object.categoryId);
      const foundProduct = await ProductService.getById(object.productId);

      if (await foundCategory.hasProduct(foundProduct)) {
        throw new CustomError(400, "Product already belongs to category");
      }

      await foundCategory.addProduct(foundProduct);
    } catch (error) {
      throw error;
    }
  }

  async deleteProductFromCategory(productId, categoryId) {
    try {
      const foundCategory = await this.getById(categoryId);
      const foundProduct = await ProductService.getById(productId);

      if (!(await foundCategory.hasProduct(foundProduct))) {
        throw new CustomError(400, "Product doesn't belong to category");
      }

      await foundCategory.removeProduct(foundProduct);
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryService();
