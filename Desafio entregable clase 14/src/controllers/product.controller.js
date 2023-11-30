import productService from "../services/Product.service.js";
import cartService from "../services/Cart.service.js";
import { customResponse, CustomError } from "../utils.js";

async function getProducts(req, res, next) {
  try {
    const { query, limit, page, sort, keyword, order } = req.query;

    const result = await productService.getProducts(
      query,
      limit,
      page,
      sort,
      order,
      keyword
    );

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const { pid } = req.params;

    const result = await productService.getById(pid);

    if (!result) {
      throw new CustomError(404, "Product not found");
    }

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function addProduct(req, res, next) {
  try {
    const result = await productService.create(req.body);

    return customResponse(res, 201, result);
  } catch (error) {
    next(error);
  }
}

async function updateProductById(req, res, next) {
  try {
    const { pid } = req.params;

    const result = await productService.updateById(pid, req.body);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function deleteProductById(req, res, next) {
  try {
    const { pid } = req.params;

    const result = await productService.deleteById(pid);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function getProductsOwnedByUser(req, res, next) {
  try {
    const uid = req.user._id;
    const { limit } = req.query;

    const result = await cartService.getProductsOwnedByUser(uid, limit);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

export {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsOwnedByUser,
};
