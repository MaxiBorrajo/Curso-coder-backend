import BaseService from "./base.service.js";
import cart from "../repositories/cart.js";
import added from "../repositories/added.js";

class CartService extends BaseService {
  constructor() {
    super(cart);
  }

  async buyCartById(cartId, userId) {
    try {
      const boughtCart = await this.updateById(cartId, { bought: true });

      await this.create({ idUser: userId });

      return boughtCart;
    } catch (error) {
      console.error("Error en buyCartById:", error);
      throw new Error("Error al comprar carrito");
    }
  }

  async getHistoryOfBuys(userId, limit = 10) {
    try {
      let aggregateQuery = await added.aggregate([
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

  async getProductsOwnedByUser(userId, limit = 10) {
    try {
      const history = await this.getHistoryOfBuys(userId, limit);

      let products = history.map((boughts) => boughts.products);

      products = products.flat(Infinity)
      
      return products;
    } catch (error) {
      console.error("Error en getHistoryOfBuys:", error);
      throw new Error("Error al obtener el historial de compras");
    }
  }

  async productAlreadyBuy(userId, productId) {
    try {
      const foundAdded = await added.findOne({
        idUser: userId,
        idProduct: productId,
      });

      if (!foundAdded) {
        return foundAdded;
      }

      const foundCart = await this.getById(foundAdded.idCart);

      return foundCart.bought;
    } catch (error) {
      console.error("Error en productAlreadyBuy:", error);
      throw new Error("Error al saber si producto ya fue comprado");
    }
  }
}

export default new CartService();
