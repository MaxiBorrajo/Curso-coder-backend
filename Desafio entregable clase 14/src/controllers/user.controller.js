import userService from "../services/User.service";

async function deleteCurrentUser(req, res, next) {
  try {
    const uid = req.user._id;

    req.logout(async function (err) {
      if (err) {
        return next(err);
      }

      await userService.deleteById(uid);

      res.status(200).json({ message: "User deleted successfully" });
    });
  } catch (error) {
    next(error);
  }
}

async function updateCurrentUser(req, res, next) {
  try {
    const uid = req.user._id;

    if (req.file) {
      req.user = {
        ...req.user,
        ...{
          urlProfilePhoto: req.file.url,
          publidId: req.file.publidId,
        },
      };
    }
    
    const updatedUser = userManager.updateById(uid, req.body);

    res.status(200).send({ message: updatedUser });
  } catch (error) {
    next(error);
  }
}

export { deleteCurrentUser, updateCurrentUser };
