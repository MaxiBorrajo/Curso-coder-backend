import user from "../../models/user.js";
import BaseDao from "./Base.dao.js";
import { deleteImageInCloud } from "../../middlewares/uploadImages.middleware.js";
import { CustomError } from "../../utils.js";

class UserDao extends BaseDao {
  constructor() {
    super(user);
  }

  async updateById(id, object) {
    try {
      if (object.publicId) {
        const foundUser = await this.getById(id);

        await deleteImageInCloud(foundUser.publicId);
      }

      return super.updateById(id, object);
    } catch (error) {
      throw error;
    }
  }

  async create(object) {
    try {
      const foundUser = await this.getByFilter({ email: object.email });

      if (foundUser) {
        throw new CustomError(400, "User already exists");
      }

      return super.create(object);
    } catch (error) {
      throw error
    }
  }

  
}

export default new UserDao();
