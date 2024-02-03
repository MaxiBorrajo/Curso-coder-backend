import userService from "../services/User.service.js";
import { customResponse } from "../utils/utils.js";
import { errors } from "../utils/errorDictionary.js";

async function deleteCurrentUser(req, res, next) {
  //controller:✓
  try {
    const uid = req.user.id;

    req.logout(async function (err) {
      if (err) {
        return next(err);
      }
    });

    await userService.deleteById(uid);

    return customResponse(res, 200, "User deleted successfully");
  } catch (error) {
    next(error);
  }
}

async function changeRole(req, res, next) {
  try {
    const uid = req.params.uid;

    await userService.changeRole(uid);

    return customResponse(res, 200, "Roles changed successfully");
  } catch (error) {
    next(error);
  }
}

async function updateCurrentUser(req, res, next) {
  //controller:✓
  try {
    const uid = req.user.id;

    if (req.file) {
      req.body = {
        ...req.body,
        ...{
          url_profile_photo: req.file.url,
          profile_public_id: req.file.publicId,
        },
      };
    }

    await userService.updateById(uid, req.body);

    return customResponse(res, 200, "User updated successfully");
  } catch (error) {
    next(error);
  }
}

async function forgotPassword(req, res, next) {
  //controller:✓
  try {
    const { email } = req.body;

    await userService.forgotPassword(email);

    return customResponse(
      res,
      200,
      "Email sent. Go to your email account to change your password"
    );
  } catch (error) {
    next(error);
  }
}

async function resetPassword(req, res, next) {
  //controller:✓
  try {
    const { token } = req.params;
    const { password } = req.body;

    await userService.resetPassword(token, password);

    return customResponse(res, 200, "Password changed successfully");
  } catch (error) {
    next(error);
  }
}

async function uploadDocument(req, res, next) {
  //controller:✓
  try {
    const uid = req.user.id;

    if (req.file) {
      req.body = {
        ...req.body,
        ...{
          url: req.file.url,
          public_id: req.file.publicId,
        },
      };
    } else {
      throw new errors.NO_DOCUMENT_UPLOADED();
    }

    await userService.uploadDocument(uid, req.body);

    return customResponse(res, 200, "Document uploaded");
  } catch (error) {
    next(error);
  }
}
export {
  deleteCurrentUser,
  updateCurrentUser,
  forgotPassword,
  resetPassword,
  changeRole,
  uploadDocument,
};
