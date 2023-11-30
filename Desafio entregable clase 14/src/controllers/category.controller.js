import categorizedService from "../services/Categorized.service.js";
import categoryService from "../services/Category.service.js";
import { customResponse } from "../utils.js";

async function getCategories(req, res, next) {
  try {
    const { keyword } = req.query;

    const result = await categoryService.getAll({}, keyword);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function addProductToCategory(req, res, next) {
  try {
    const result = await categorizedService.create(req.body);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function deleteProductFromCategory(req, res, next) {
  try {
    const { ctid, pid } = req.params;

    const result = await categorizedService.deleteProductFromCategory(
      pid,
      ctid
    );

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function createCategory(req, res, next) {
  try {
    const result = await categoryService.create(req.body);

    return customResponse(res, 201, result);
  } catch (error) {
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const { ctid } = req.params;

    const result = await categoryService.deleteById(ctid);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function getProductsByCategory(req, res, next) {
  try {
    const { page } = req.query;
    const { ctid } = req.params;

    const result = await categorizedService.getProductsByCategory(ctid, page);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

export {
  addProductToCategory,
  createCategory,
  deleteCategory,
  deleteProductFromCategory,
  getCategories,
  getProductsByCategory,
};
