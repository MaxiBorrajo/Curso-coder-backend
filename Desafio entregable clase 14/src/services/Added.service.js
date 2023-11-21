import BaseService from "./base.service.js";
import added from "../models/added.js";

class AddedService extends BaseService {
  constructor() {
    super(added);
  }

  async getProductsOfCart(idCart, limit = 10, page = 1) {
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
        { idCart: idCart },
        options
      );

      return foundObjects;
    } catch (error) {
      console.error("Error en getProductsOfCart:", error);
      throw new Error("Error al obtener los productos del carrito");
    }
  }
}

export default new AddedService();
