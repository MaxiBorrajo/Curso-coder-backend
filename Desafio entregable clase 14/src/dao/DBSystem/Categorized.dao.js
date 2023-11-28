import categorized from "../../models/categorized.js";
import BaseDao from "./Base.dao.js";

class CategorizedDao extends BaseDao {
  constructor() {
    super(categorized);
  }

  async create(data) {
    try {
      const foundProductInCategory = await this.getByFilter(data);

      if (foundProductInCategory) {
        throw new Error("Product already in category");
      }

      return super.create(data);
    } catch (error) {
      console.error("Error en addProductToCategory:", error);
      throw new Error("Error al añadir product a categoria");
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

      const foundObjects = await this.model.paginate(
        { idCategory: idCategory },
        options
      );

      return foundObjects;
    } catch (error) {
      console.error("Error en getProductsByCategory:", error);
      throw new Error("Error al obtener los productos por categoria");
    }
  }
}

export default new CategorizedDao();
