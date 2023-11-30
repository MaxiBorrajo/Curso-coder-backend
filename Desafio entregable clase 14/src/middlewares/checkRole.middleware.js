import { CustomError } from "../utils.js";

function isAdmin(req, res, next) {
  if (req.user.role === "ADMIN") {
    next();
  } else {
    next(new CustomError(403, "You don't have permission to access this page"))
  }
}

export default isAdmin;
