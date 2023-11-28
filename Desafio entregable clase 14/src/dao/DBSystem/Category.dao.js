import category from "../../models/category.js";
import BaseDao from "./Base.dao.js";

class CategoryDao extends BaseDao {
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
}

export default new CategoryDao();
