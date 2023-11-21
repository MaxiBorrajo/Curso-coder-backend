import BaseService from "./base.service.js";
import rating from "../repositories/rating.js";

class RatingService extends BaseService {
  constructor() {
    super(rating);
  }

  async create(object) {
    try {
      let rating = await this.getByFilter({
        idUser: object.idUser,
        idProduct: object.idProduct,
      });

      if (rating) {
        rating = await this.updateById(foundRating._id, object);
      } else {
        rating = await this.model.create(object);
      }

      return rating;
    } catch (error) {
      console.error("Error en create:", error);
      throw new Error("Error al valorar producto");
    }
  }

  async getMostValueProductsRecently() {
    try {
      const now = new Date();
      const lastWeek = 1000 * 60 * 60 * 24 * 7;
      const startDate = new Date(now - lastWeek);

      const foundProducts = await this.rating
        .find({
          createdAt: {
            $gte: startDate,
            $lte: now,
          },
        })
        .populate("products")
        .sort({ rating: -1 })
        .limit(5);

      return foundProducts;
    } catch (error) {
      console.error("Error en getMostValueProductsRecently:", error);
      throw new Error(
        "Error al obtener los productos mejor valorados recientemente"
      );
    }
  }

  async getPromedyOfRatingProduct(productId) {
    try {
      const rating = await this.model.aggregate([
        {
          $match: {
            idProduct: productId,
          },
        },
        {
          $group: {
            _id: "$idProduct",
            avgRating: { $avg: "$rating" },
          },
        },
      ]);

      return rating;
    } catch (error) {
      console.error("Error en getPromedyOfRatingProduct:", error);
      throw new Error("Error al obtener la valoracion de un producto");
    }
  }

  async getPromedyOfRatingProduct(productId) {
    try {
      const rating = await this.model.aggregate([
        {
          $match: {
            idProduct: productId,
          },
        },
        {
          $group: {
            _id: "$idProduct",
            avgRating: { $avg: "$rating" },
          },
        },
      ]);

      return rating;
    } catch (error) {
      console.error("Error en getPromedyOfRatingProduct:", error);
      throw new Error("Error al obtener la valoracion de un producto");
    }
  }

  async getProductsOrderByRating(limit = 10, page = 1, sort = 0) {
    try {
      const pipeline = [
        {
          $group: {
            _id: "$idProduct",
            avgRating: { $avg: "$rating" },
          },
        },
        {
          $sort: {
            avgRating: sort,
          },
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ];

      const foundProducts = await this.model.aggregate(pipeline);

      return foundProducts;
    } catch (error) {
      console.error("Error en getProductsOrderByRating:", error);
      throw new Error(
        "Error al obtener los productos ordenados por valoración"
      );
    }
  }
}

export default new RatingService();
