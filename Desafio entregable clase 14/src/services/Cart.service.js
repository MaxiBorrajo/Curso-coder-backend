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
      throw error;
    }
  }

  async buyCartById(cartId, userId) {
    try {
      const boughtCart = await this.updateById(cartId, { bought: true });

      await this.create({ idUser: userId });

      return boughtCart;
    } catch (error) {
      throw error;
    }
  }
}

export default new CartService();
