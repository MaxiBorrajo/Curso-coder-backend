import BaseService from "./base.service.js";
import added from "../repositories/added.js";
import cart from "../repositories/cart.js";

class AddedService extends BaseService {
  constructor() {
    super(added);
  }

  async create(object) {
    try {
      const foundProduct = await this.getByFilter(object);

      if (foundProduct) {
        throw new Error("Product already added to cart");
      }

      const foundCart = await cart.findOne({
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
      console.error("Error en getProductsOfCart:", error);
      throw new Error("Error al obtener los productos del carrito");
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
      console.error("Error en productAlreadyAdded:", error);
      throw new Error(
        "Error al obtener si el producto ya fue añadido al carrito"
      );
    }
  }
}

export default new AddedService();
