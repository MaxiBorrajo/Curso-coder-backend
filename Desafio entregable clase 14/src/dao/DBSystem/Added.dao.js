import BaseDao from "./Base.dao.js";
import added from "../../models/added.js";
import cartService from "../../services/Cart.service.js";
import { CustomError } from "../../utils.js";

class AddedDao extends BaseDao {
  constructor() {
    super(added);
  }

  async create(object) {
    try {
      const foundProduct = await this.model
        .findOne(object)
        .populate({ path: "idCart" });

      if (foundProduct) {
        const error = foundProduct.idCart.bought
          ? "Product already bought"
          : "Product already added to cart";

        throw new CustomError(400, error);
      }

      const foundCart = await cartService.getByFilter({
        idUser: object.idUser,
        bought: false,
      });

      object = { ...object, ...{ idCart: foundCart._id } };

      return super.create(object);
    } catch (error) {
      throw error;
    }
  }

  async getProductsOfCart(idCart, limit = 10, page = 1) {
    try {
      const options = {
        page: page,
        limit: limit,
        populate: "idProduct",
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
      throw error;
    }
  }

  async productAlreadyAdded(cartId, productId, userId) {
    try {
      const foundProduct = await this.model.exists({
        idUser: userId,
        idProduct: productId,
        idCart: cartId,
      });

      return foundProduct;
    } catch (error) {
      throw error;
    }
  }
}

export default new AddedDao();
