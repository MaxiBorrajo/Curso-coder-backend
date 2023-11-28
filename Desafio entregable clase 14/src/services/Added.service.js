import BaseService from "./base.service.js";
import AddedDao from "../dao/DBSystem/Added.dao.js";

class AddedService extends BaseService {
  constructor() {
    super(AddedDao);
  }

  async getProductsOfCart(idCart, limit, page) {
    try {
      const foundObjects = await this.dao.getProductsOfCart(
        idCart,
        limit,
        page
      );

      foundObjects.status =
        foundObjects.payload.length > 0 ? "success" : "error";

      delete foundObjects.totalDocs;
      delete foundObjects.limit;
      delete foundObjects.pagingCounter;

      foundObjects.prevLink = foundObjects.hasPrevPage
        ? `http://localhost:8080/api/carts/${cid}/products?page=${foundObjects.prevPage}`
        : null;
      foundObjects.nextLink = foundObjects.hasNextPage
        ? `http://localhost:8080/api/carts/${cid}/products?page=${foundObjects.nextPage}`
        : null;

      return foundObjects;
    } catch (error) {
      throw new Error(error);
    }
  }

  async productAlreadyAdded(cartId, productId, userId) {
    try {
      const foundProduct = await this.dao.productAlreadyAdded(
        cartId,
        productId,
        userId
      );

      return foundProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getHistoryOfBuys(userId, limit = 10) {
    try {
      let aggregateQuery = await this.aggregate([
        {
          $match: { idUser: userId },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $lookup: {
            from: "products",
            localField: "idProduct",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $group: {
            _id: "$idCart",
            totalPrice: { $sum: { $sum: "$product.price" } },
            products: { $push: "$product" },
          },
        },
        {
          $lookup: {
            from: "carts",
            localField: "_id",
            foreignField: "_id",
            as: "_id",
          },
        },
        {
          $limit: +limit,
        },
      ]);

      aggregateQuery = aggregateQuery.filter((buy) => {
        return buy._id[0].bought;
      });

      return aggregateQuery;
    } catch (error) {
      console.error("Error en getHistoryOfBuys:", error);
      throw new Error("Error al obtener el historial de compras");
    }
  }

  async getProductsOwnedByUser(userId, limit) {
    try {
      const history = await this.getHistoryOfBuys(userId, limit);

      let products = history.map((boughts) => boughts.products);

      products = products.flat(Infinity);

      return products;
    } catch (error) {
      console.error("Error en getHistoryOfBuys:", error);
      throw new Error("Error al obtener el historial de compras");
    }
  }
}

export default new AddedService();
