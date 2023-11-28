import ProductPhotoDao from "../dao/DBSystem/ProductPhoto.dao.js";
import BaseService from "./base.service.js";

class ProductPhotoService extends BaseService {
  constructor() {
    super(ProductPhotoDao);
  }
}

export default new ProductPhotoService();
