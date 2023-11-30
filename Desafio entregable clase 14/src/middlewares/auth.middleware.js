import jwt from "jsonwebtoken";
import userService from "../services/User.service.js";
import { CustomError } from "../utils.js";

async function isAuthenticated(req, res, next) {
  if (req.isAuthenticated() || (await jwtValid(req, res, next))) {
    next();
  } else {
    next(new CustomError(401, "Invalid credentials"));
  }
}

async function isNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated() && !(await jwtValid(req, res, next))) {
    next();
  } else {
    next(new CustomError(401, "You have to logout to access this page"));
  }
}

async function jwtValid(req, res, next) {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      return null;
    }

    const token = authHeader.replace("Bearer ", "");

    const responseToken = jwt.verify(token, process.env.JWT_SECRET);

    const foundUser = await userService.getById(responseToken._id);

    if (!foundUser) {
      return null;
    }

    req.user = foundUser;

    return foundUser;
  } catch (error) {
    next(error);
  }
}

export { isAuthenticated, isNotAuthenticated };
