import productPhoto from "../../models/productPhoto.js";
import BaseDao from "./Base.dao.js";

class ProductPhotoDao extends BaseDao {
  constructor() {
    super(productPhoto);
  }
}

export default new ProductPhotoDao();
