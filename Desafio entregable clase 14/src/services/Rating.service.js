import BaseService from "./base.service.js";
import RatingDao from "../dao/DBSystem/Rating.dao.js";
import mongoose from "mongoose";

class RatingService extends BaseService {
  constructor() {
    super(RatingDao);
  }

  async getMostValueProductsRecently() {
    try {
      const now = new Date();
      const lastWeek = 1000 * 60 * 60 * 24 * 7;
      const startDate = new Date(now - lastWeek);

      const aggregateQuery = await this.dao.aggregate([
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
      throw error;
    }
  }

  async getRatingProduct(productId) {
    try {
      const ratingPromedy = await this.dao.aggregate([
        { $match: { idProduct: new mongoose.Types.ObjectId(productId) } },
        {
          $group: {
            _id: "$idProduct",
            avgRating: { $avg: "$rating" },
          },
        },
      ]);

      const ratingCount = await this.aggregate([
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
      throw error;
    }
  }
}

export default new RatingService();
