import userService from "../services/User.service.js";
import { customResponse } from "../utils.js";

async function deleteCurrentUser(req, res, next) {
  try {
    const uid = req.user._id;

    req.logout(async function (err) {
      if (err) {
        return next(err);
      }

      await userService.deleteById(uid);

      return customResponse(res, 200, "User deleted successfully");
    });
  } catch (error) {
    next(error);
  }
}

async function updateCurrentUser(req, res, next) {
  try {
    const uid = req.user._id;

    if (req.file) {
      req.body = {
        ...req.body,
        ...{
          urlProfilePhoto: req.file.url,
          publicId: req.file.publicId,
        },
      };
    }

    const result = await userService.updateById(uid, req.body);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

export { deleteCurrentUser, updateCurrentUser };
