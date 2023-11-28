import BaseService from "./base.service.js";
import CartDao from "../dao/DBSystem/Cart.dao.js"
import addedService from "./Added.service.js";

class CartService extends BaseService {
  constructor() {
    super(CartDao);
  }

  async productAlreadyBuy(userId, productId) {
    try {
      const foundAdded = await addedService.getByFilter({
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
}

export default new CartService();
