import category from "../models/category.js";
import BaseService from "./base.service.js";

class CategoryService extends BaseService {
  constructor() {
    super(category);
  }

  async getProductsByCategory(idCategory, limit = 10, page = 1, sort = 0) {
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

    const foundObjects = await this.model.paginate(
      { _id: idCategory },
      options
    );

    return foundObjects;
  }
}

export default new CategoryService();
