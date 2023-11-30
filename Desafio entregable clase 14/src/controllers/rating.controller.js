import ratingService from "../services/Rating.service.js";
import { customResponse } from "../utils.js";

async function rateProduct(req, res, next) {
  try {
    const rating = { ...req.body, ...{ idUser: req.user._id } };

    const result = await ratingService.create(rating);

    return customResponse(res, 201, result);
  } catch (error) {
    next(error);
  }
}

async function getRatingOfProduct(req, res, next) {
  try {
    const { pid } = req.params;

    const result = await ratingService.getRatingProduct(pid);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function getRatingOfCurrentUser(req, res, next) {
  try {
    const uid = req.user._id;

    const { pid } = req.params;

    const result = await ratingService.getByFilter({
      idUser: uid,
      idProduct: pid,
    });

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function getMostRatedProductsOfLastWeek(req, res, next) {
  try {
    const result = await ratingService.getMostValueProductsRecently();

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

export {
  getRatingOfProduct,
  rateProduct,
  getRatingOfCurrentUser,
  getMostRatedProductsOfLastWeek,
};
