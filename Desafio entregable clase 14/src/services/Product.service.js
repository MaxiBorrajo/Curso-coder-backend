import ProductDao from "../dao/DBSystem/Product.dao.js";
import BaseService from "./base.service.js";

class ProductService extends BaseService {
  constructor() {
    super(ProductDao);
  }

  async getRecentProducts() {
    try {
      const now = Date.now();
      const week = 1000 * 60 * 60 * 24 * 7;
      const lastWeek = new Date(now - week);

      const products = await this.dao.getProducts(
        {
          createdAt: { $gte: lastWeek, $lte: now },
        },
        5,
        1,
        "createdAt",
        -1
      );

      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProducts(query, limit = 10, page = 1, sort, order, keyword = "") {
    try {
      const products = await this.dao.getProducts(
        query,
        limit,
        page,
        sort,
        order,
        keyword
      );

      products.status = products.payload.length > 0 ? "success" : "error";

      delete products.totalDocs;
      delete products.limit;
      delete products.pagingCounter;

      products.prevLink = products.hasPrevPage
        ? `http://localhost:8080/api/products?page=${products.prevPage}`
        : null;
      products.nextLink = products.hasNextPage
        ? `http://localhost:8080/api/products?page=${products.nextPage}`
        : null;

      products.prevLink =
        sort && order && products.prevLink
          ? products.prevLink + `&sort=${sort}&order=${order}`
          : products.prevLink;
      products.nextLink =
        sort && order && products.nextLink
          ? products.nextLink + `&sort=${sort}&order=${order}`
          : products.nextLink;
      products.prevLink =
        keyword && products.prevLink
          ? products.prevLink + `&keyboard=${keyword}`
          : products.prevLink;
      products.nextLink =
        keyword && products.nextLink
          ? products.nextLink + `&keyboard=${keyword}`
          : products.nextLink;
      products.prevLink =
        limit && products.prevLink
          ? products.prevLink + `&limit=${limit}`
          : products.prevLink;
      products.nextLink =
        limit && products.nextLink
          ? products.nextLink + `&limit=${limit}`
          : products.nextLink;

      return products;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductService();
