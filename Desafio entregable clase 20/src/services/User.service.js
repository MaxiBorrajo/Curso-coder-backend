import UserDao from "../dao/DBSystem/User.dao.js";
import BaseService from "./base.service.js";
import CartService from "./Cart.service.js";
import AuthService from "./Auth.service.js";
import { UserDto } from "../dto/User.dto.js";
import { deleteImageInCloud } from "../middlewares/uploadImages.middleware.js";

import {
  generateToken,
  matchPasswords,
  createUniqueToken,
  sendEmail,
} from "../utils/utils.js";
import { errors } from "../utils/errorDictionary.js";

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

      this.validateUserAlreadyExists(foundUser);

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

  async validateUserAlreadyExists(foundUser) {
    if (foundUser) {
      throw new errors.USER_ALREADY_EXISTS();
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

      this.validateCredentials(foundUser, object.password);

      this.validateLoginMethod(foundUser);

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

  validateLoginMethod(user) {
    if (user.oauthuser) {
      throw new errors.BAD_LOGIN_METHOD();
    }
  }

  async validateCredentials(user, password) {
    if (!user || !(await matchPasswords(password, user.password))) {
      throw new errors.EMAIL_OR_PASSWORD_WRONG();
    }
  }

  async forgotPassword(email) {
    try {
      const foundUser = await this.getByFilter({
        where: {
          email: email,
        },
      });

      this.validateUserToChangePassword(foundUser);

      const resetPasswordToken = createUniqueToken();

      const actualTime = new Date().getTime();

      const plusOneHour = 1000 * 60 * 60;

      const resetPasswordTokenExpiration = new Date(actualTime + plusOneHour);

      this.deleteResetPasswordToken(foundUser.id);

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

  validateUserToChangePassword(user) {
    if (!user || user.oauthuser) {
      throw new errors.USER_NOT_FOUND();
    }
  }

  async deleteResetPasswordToken(user_id) {
    try {
      await AuthService.deleteByFilter({
        where: {
          userId: user_id,
        },
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

      this.validateResetPasswordToken(foundToken);

      this.validateResetPasswordTokenExpiration(
        foundToken.resetPasswordTokenExpiration
      );

      await this.validateSamePassword(foundToken, newPassword);

      await this.updateById(foundToken.userId, { password: newPassword });

      await foundToken.destroy();
    } catch (error) {
      throw error;
    }
  }

  async validateSamePassword(token, password) {
    try {
      const foundUser = await this.getById(token.userId);

      if (foundUser && (await matchPasswords(password, foundUser.password))) {
        throw new errors.SAME_PASSWORD();
      }
    } catch (error) {
      throw error;
    }
  }

  validateResetPasswordTokenExpiration(expiration) {
    if (new Date() > expiration) {
      throw new errors.RESET_PASSWORD_TOKEN_EXPIRED();
    }
  }

  validateResetPasswordToken(token) {
    if (!token) {
      throw new errors.INVALID_RESET_PASSWORD_TOKEN();
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

  async changeRole(id) {
    try {
      const foundUser = await this.getById(id);

      this.validateUserExists(foundUser);

      this.updateById(id, {
        role: foundUser.role === "USER" ? "ADMIN" : "USER",
      });
    } catch (error) {
      throw error;
    }
  }

  validateUserExists(user) {
    if (!user) {
      throw new errors.USER_NOT_FOUND();
    }
  }
}

export default new UserService();
