import UserDao from "../dao/DBSystem/User.dao.js";
import BaseService from "./base.service.js";
import CartService from "./Cart.service.js";
import AuthService from "./Auth.service.js";
import { UserDto } from "../dto/User.dto.js";
import { deleteImageInCloud } from "../middlewares/uploadImages.middleware.js";

import {
  generateToken,
  CustomError,
  matchPasswords,
  createUniqueToken,
  sendEmail,
} from "../utils.js";

class UserService extends BaseService {
  constructor() {
    super(UserDao);
  }

  async create(object) {
    try {
      const foundUser = await this.getByFilter({
        where: {
          email: object.email,
        },
      });

      if (foundUser) {
        throw new CustomError(400, "User already exists");
      }

      const createdUser = await super.create(object);

      await CartService.create({
        userId: createdUser.id,
      });

      const userDto = new UserDto(
        createdUser.id,
        createdUser.first_name,
        createdUser.last_name,
        createdUser.email,
        createdUser.role,
        createdUser.url_profile_photo
      );

      return userDto;
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, object) {
    try {
      const foundUser = await this.getById(id);

      if (object.profile_public_id) {
        await deleteImageInCloud(foundUser.profile_public_id);
      }

      return super.updateById(id, object);
    } catch (error) {
      throw error;
    }
  }

  async login(object) {
    try {
      const foundUser = await this.getByFilter({
        where: {
          email: object.email,
        },
      });

      if (
        !foundUser ||
        !(await matchPasswords(object.password, foundUser.password))
      ) {
        throw new CustomError(401, "Email or password are wrong");
      }

      const userDto = new UserDto(
        foundUser.id,
        foundUser.first_name,
        foundUser.last_name,
        foundUser.email,
        foundUser.role,
        foundUser.url_profile_photo
      );

      const response = {
        token: await generateToken({ id: foundUser.id }),
        user: userDto,
      };

      return response;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email) {
    try {
      const foundUser = await this.getByFilter({
        where: {
          email: email,
        },
      });

      if (!foundUser || foundUser.oauthuser) {
        throw new CustomError(400, "User not found");
      }

      const resetPasswordToken = createUniqueToken();

      const actualTime = new Date().getTime();

      const plusTenMinutes = 1000 * 60 * 10;

      const resetPasswordTokenExpiration = new Date(
        actualTime + plusTenMinutes
      );

      await AuthService.create({
        resetPasswordToken: resetPasswordToken,
        resetPasswordTokenExpiration: resetPasswordTokenExpiration,
        userId: foundUser.id,
      });

      const resetPasswordUrl = `${process.env.URL_FRONTEND}/resetPassword/${resetPasswordToken}`;

      const emailBody = `
        <h1>Reset password</h1>
        <p>To reset your password click the following link (<span style="color:red;">IMPORTANT</span>: You only have ten minutes until expiration): </p>
        <a href='${resetPasswordUrl}' rel='noreferrer' referrerpolicy='origin' clicktracking='off'>Change your password</a>
      `;

      sendEmail({
        to: email,
        subject: "Password Reset Requested",
        html: emailBody,
      });
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(token, newPassword) {
    try {
      const foundToken = await AuthService.getByFilter({
        where: {
          resetPasswordToken: token,
        },
      });

      if (!foundToken) {
        throw new CustomError(401, "Invalid reset password token");
      }

      if (new Date() > foundToken.resetPasswordTokenExpiration) {
        await foundToken.destroy();

        throw new CustomError(401, "Token expired");
      }

      await this.updateById(foundToken.userId, { password: newPassword });

      await foundToken.destroy();
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      await CartService.deleteByFilter({
        where: {
          userId: id,
        },
      });

      return await super.deleteById(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
