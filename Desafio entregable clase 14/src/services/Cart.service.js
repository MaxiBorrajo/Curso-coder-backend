import BaseService from "./base.service.js";
import cart from "../models/cart.js";

class CartService extends BaseService {
  constructor() {
    super(cart);
  }
}

export default new CartService();
