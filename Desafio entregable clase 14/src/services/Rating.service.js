import BaseService from "./base.service.js";
import rating from "../repositories/rating.js";

class RatingService extends BaseService {
  constructor() {
    super(rating);
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
      throw new Error("Error al obtener los productos mejor valorados recientemente");
    }
  }
  

  
}

export default new RatingService();
