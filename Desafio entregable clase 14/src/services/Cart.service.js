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

  async getHistoryOfBuys(userId, limit, page) {
    try {
      const options = {
        page: page,
        limit: limit,
        populate: "idProduct idCart",
        customLabels: {
          docs: "payload",
        },
        sort: { createdAt: -1 },
      };

      const boughtCarts = await added.paginate({ idUser: userId }, options)

      return boughtCarts;
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
      
      if(!foundAdded) {
        return foundAdded
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
