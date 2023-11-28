import CategorizedDao from "../dao/DBSystem/Categorized.dao.js";
import BaseService from "./base.service.js";

class CategorizedService extends BaseService {
  constructor() {
    super(CategorizedDao);
  }

  async getProductsByCategory(idCategory, page) {
    try {
      const foundObjects = await this.dao.getProductsByCategory(
        idCategory,
        page
      );

      foundObjects.status =
        foundObjects.payload.length > 0 ? "success" : "error";

      delete foundObjects.totalDocs;
      delete foundObjects.limit;
      delete foundObjects.pagingCounter;

      foundObjects.prevLink = foundObjects.hasPrevPage
        ? `http://localhost:8080/api/categories/${ctid}/products?page=${foundObjects.prevPage}`
        : null;
      foundObjects.nextLink = foundObjects.hasNextPage
        ? `http://localhost:8080/api/categories/${ctid}/products?page=${foundObjects.nextPage}`
        : null;

      return foundObjects;
    } catch (error) {
      console.error("Error en getProductsByCategory:", error);
      throw new Error("Error al obtener los productos por categoria");
    }
  }
}

export default new CategorizedService();
