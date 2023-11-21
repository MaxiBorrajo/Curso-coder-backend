import buy from "../models/buys.js";
import BaseService from "./base.service.js";

class BuysService extends BaseService {
  constructor() {
    super(buy);
  }

  async getHistoryOfBuys(userId, limit = 10, page = 1) {
    try {
      const options = {
        page: page,
        limit: limit,
        populate: "products",
        customLabels: {
          docs: "payload",
        },
        sort: { createdAt: -1 },
      };

      const foundObjects = await this.model.paginate(
        { idUser: userId },
        options
      );

      return foundObjects;
    } catch (error) {
      console.error("Error en getHistoryOfBuys:", error);
      throw new Error("Error al obtener el historial de compras");
    }
  }

  async productAlreadyBuy(userId, productId) {
    try {
      const foundBuy = await this.model.exists({
        idUser: userId,
        idProduct: productId,
      });

      return foundBuy;
    } catch (error) {
      console.error("Error en productAlreadyBuy:", error);
      throw new Error("Error al obtener si el producto ya fue comprado");
    }
  }
}

export default new BuysService();
