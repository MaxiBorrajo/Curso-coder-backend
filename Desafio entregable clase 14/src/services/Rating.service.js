import BaseService from "./base.service.js";
import rating from "../repositories/rating.js";
import mongoose from "mongoose";

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
        rating = await this.updateById(rating._id, object);
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

      const aggregateQuery = await this.model.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDate,
              $lte: now,
            },
          },
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
          $limit: 5,
        },
        {
          $group: {
            _id: "$product",
            avgRating: { $avg: "$rating" },
          },
        },
        {
          $sort: { avgRating: -1 },
        },
      ]);

      return aggregateQuery;
    } catch (error) {
      console.error("Error en getMostValueProductsRecently:", error);
      throw new Error(
        "Error al obtener los productos mejor valorados recientemente"
      );
    }
  }

  async getRatingProduct(productId) {
    try {
      const ratingPromedy = await this.model.aggregate([
        { $match: { idProduct: new mongoose.Types.ObjectId(productId) } },
        {
          $group: {
            _id: "$idProduct",
            avgRating: { $avg: "$rating" },
          },
        },
      ]);

      const ratingCount = await this.model.aggregate([
        {
          $match: {
            idProduct: new mongoose.Types.ObjectId(productId),
          },
        },
        {
          $group: {
            _id: "$rating",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            rating: "$_id",
            count: 1,
          },
        },
      ]);

      return {
        avg: ratingPromedy,
        count: ratingCount,
      };
    } catch (error) {
      console.error("Error en getPromedyOfRatingProduct:", error);
      throw new Error("Error al obtener la valoracion de un producto");
    }
  }
}

export default new RatingService();
