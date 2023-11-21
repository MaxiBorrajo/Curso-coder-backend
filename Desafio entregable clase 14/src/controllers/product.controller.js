import productService from "../services/Product.service.js";
import ratingService from "../services/Rating.service.js";

async function getProducts(req, res, next) {
  try {
    const { query, limit, page, sort, keyboard } = req.query;

    const products = await productService.getProducts(
      query,
      limit,
      page,
      sort,
      keyboard
    );

    products.status = products.payload.length > 0 ? "success" : "error";

    delete products.totalDocs;
    delete products.limit;
    delete products.pagingCounter;

    products.prevLink = products.hasPrevPage
      ? `http://localhost:8080/api/products?page=${products.prevPage}&sort=${sort}&keyboard=${keyboard}`
      : null;
    products.nextLink = products.hasNextPage
      ? `http://localhost:8080/api/products?page=${products.nextPage}&sort=${sort}&keyboard=${keyboard}`
      : null;

    res.status(200).json({ result: products });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const { pid } = req.params;

    const product = await productService.getById(pid);

    if (product) {
      res.status(200).json({ product: product });
    } else {
      res.status(400).json({ product: "Not found" });
    }
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

async function getMostValueProductsOnLastWeek(req, res, next) {
  try {
    const products = await ratingService.getMostValueProductsRecently();

    res.status(200).json({ message: products });
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
  getMostValueProductsOnLastWeek
};
