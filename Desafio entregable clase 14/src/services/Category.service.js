import CategoryDao from "../dao/DBSystem/Category.dao.js";
import BaseService from "./base.service.js";

class CategoryService extends BaseService {
  constructor() {
    super(CategoryDao);
  }

  async getAll(filter, keyword = "") {
    try {
      return await this.dao.getAll(filter, keyword);
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryService();
