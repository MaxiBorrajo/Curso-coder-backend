import user from "../repositories/user.js";
import BaseService from "./base.service.js";
import jwt from "jsonwebtoken";

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

  async deleteById(id) {
    try {
      const deletedObject = await this.model.findByIdAndDelete(id);

      return deletedObject;
    } catch (error) {
      throw error;
    }
  }

  async generateToken(data) {
    const token = jwt.sign(data, process.env.JWT_SECRET);

    return token;
  }

  async login(object) {
    try {
      const foundUser = await this.getByFilter({ email: object.email });

      if (!foundUser || !(await foundUser.matchPasswords(object.password))) {
        throw new Error("Email or password are wrong");
      }

      const response = {
        token: this.generateToken(foundUser),
        user: foundUser,
      };

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
