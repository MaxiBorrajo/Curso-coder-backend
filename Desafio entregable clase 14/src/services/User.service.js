import UserDao from "../dao/DBSystem/User.dao.js";
import BaseService from "./base.service.js";
import { generateToken } from "../utils.js";

class UserService extends BaseService {
  constructor() {
    super(UserDao);
  }

  async login(object) {
    try {
      const foundUser = await this.getByFilter({ email: object.email });

      if (!foundUser || !(await foundUser.matchPasswords(object.password))) {
        throw new Error("Email or password are wrong");
      }

      const response = {
        token: await generateToken(foundUser.toJSON()),
        user: foundUser,
      };

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
