import user from "../repositories/user.js";
import BaseService from "./base.service.js";

class UserService extends BaseService {
  constructor() {
    super(user);
  }

  async create(object) {
    try {
      const foundUser = await this.getByFilter({ email: object.email });

      if (foundUser) {
        throw new Error("User already exists");
      }

      return super.create(object);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
