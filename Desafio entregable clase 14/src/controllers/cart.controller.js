import cartService from "../services/Cart.service";
import addedService from "../services/Added.service";

async function addProductToCart(req, res, next) {
  try {
    const result = await addedService.create(req.body);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function getProductsOfCartById(req, res, next) {
  try {
    const { page } = req.query;
    const { cid } = req.params;

    const products = await addedService.getProductsOfCart(cid, 10, page);

    products.status = products.payload.length > 0 ? "success" : "error";

    delete products.totalDocs;
    delete products.limit;
    delete products.pagingCounter;

    products.prevLink = products.hasPrevPage
      ? `http://localhost:8080/api/carts/products?page=${products.prevPage}`
      : null;
    products.nextLink = products.hasNextPage
      ? `http://localhost:8080/api/carts/products?page=${products.nextPage}`
      : null;

    res.status(200).json({ products: products });
  } catch (error) {
    next(error);
  }
}

async function deleteProductFromCart(req, res, next) {
  try {
    const { aid } = req.params;

    const result = await addedService.deleteById(aid);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function getCartOfActiveUser(req, res, next) {
  try {
    const uid = req.user._id;

    const result = await cartService.getByFilter({ idUser: uid });

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

export {
  addProductToCart,
  deleteProductFromCart,
  getCartOfActiveUser,
  getProductsOfCartById,
};
