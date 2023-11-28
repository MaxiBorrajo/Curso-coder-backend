import productService from "../services/Product.service.js";
import cartService from "../services/Cart.service.js";

async function getProducts(req, res, next) {
  try {
    const { query, limit, page, sort, keyword, order } = req.query;

    const products = await productService.getProducts(
      query,
      limit,
      page,
      sort,
      order,
      keyword
    );

    res.status(200).json({ message: products });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const { pid } = req.params;

    const product = await productService.getById(pid);

    if (!product) {
      return res.status(400).json({ message: "Not found" });
    }

    return res.status(200).json({ message: product });
  } catch (error) {
    next(error);
  }
}

async function addProduct(req, res, next) {
  try {
    const result = await productService.create(req.body);

    res.status(201).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function updateProductById(req, res, next) {
  try {
    const { pid } = req.params;

    const result = await productService.updateById(pid, req.body);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function deleteProductById(req, res, next) {
  try {
    const { pid } = req.params;

    const result = await productService.deleteById(pid);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function getProductsOwnedByUser(req, res, next) {
  try {
    const uid = req.user._id;
    const { limit } = req.query;

    const result = await cartService.getProductsOwnedByUser(uid, limit);

    res.status(200).json({ message: result });
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
