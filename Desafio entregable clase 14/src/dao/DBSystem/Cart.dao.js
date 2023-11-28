import BaseDao from "./Base.dao.js";
import cart from "../../models/cart.js";

class CartDao extends BaseDao {
  constructor() {
    super(cart);
  }
}

export default new CartDao();
