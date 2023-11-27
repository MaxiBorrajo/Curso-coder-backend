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

    products.status = products.payload.length > 0 ? "success" : "error";

    delete products.totalDocs;
    delete products.limit;
    delete products.pagingCounter;

    products.prevLink = products.hasPrevPage
      ? `http://localhost:8080/api/products?page=${products.prevPage}`
      : null;
    products.nextLink = products.hasNextPage
      ? `http://localhost:8080/api/products?page=${products.nextPage}`
      : null;

    products.prevLink =
      sort && order && products.prevLink
        ? products.prevLink + `&sort=${sort}&order=${order}`
        : products.prevLink;
    products.nextLink =
      sort && order && products.nextLink
        ? products.nextLink + `&sort=${sort}&order=${order}`
        : products.nextLink;
    products.prevLink =
      keyword && products.prevLink
        ? products.prevLink + `&keyboard=${keyword}`
        : products.prevLink;
    products.nextLink =
      keyword && products.nextLink
        ? products.nextLink + `&keyboard=${keyword}`
        : products.nextLink;
    products.prevLink =
      limit && products.prevLink
        ? products.prevLink + `&limit=${limit}`
        : products.prevLink;
    products.nextLink =
      limit && products.nextLink
        ? products.nextLink + `&limit=${limit}`
        : products.nextLink;

    res.status(200).json({ message: products });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const { pid } = req.params;

    const product = await productService.getById(pid);

    if (product) {
      res.status(200).json({ message: product });
    } else {
      res.status(400).json({ message: "Not found" });
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
  getProductsOwnedByUser
};
