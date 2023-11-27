import productPhoto from "../repositories/productPhoto.js";
import BaseService from "./base.service.js";

class ProductPhotoService extends BaseService {
  constructor() {
    super(productPhoto);
  }
}

export default new ProductPhotoService();
