import cartService from "../services/Cart.service.js";
import addedService from "../services/Added.service.js";

async function addProductToCart(req, res, next) {
  try {
    const data = {
      ...req.body,
      ...{
        idUser: req.user._id,
      },
    };

    const result = await addedService.create(data);

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
      ? `http://localhost:8080/api/carts/${cid}/products?page=${products.prevPage}`
      : null;
    products.nextLink = products.hasNextPage
      ? `http://localhost:8080/api/carts/${cid}/products?page=${products.nextPage}`
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

    const result = await cartService.getByFilter({
      idUser: uid,
      bought: false,
    });

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function productAlreadyAddedToCart(req, res, next) {
  try {
    const uid = req.user._id;
    const { cid, pid } = req.params;

    const result = await addedService.productAlreadyAdded(cid, pid, uid);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function buyCart(req, res, next) {
  try {
    const uid = req.user._id;
    const { cid } = req.params;

    const purchase = await cartService.buyCartById(cid, uid);

    res.status(200).json({ message: purchase });
  } catch (error) {
    next(error);
  }
}

async function getHistoryBuysOfCurrentUser(req, res, next) {
  try {
    const uid = req.user._id;
    const { limit } = req.query;

    const history = await cartService.getHistoryOfBuys(uid, limit);

    res.status(200).json({ message: history });
  } catch (error) {
    next(error);
  }
}

async function productIsBought(req, res, next) {
  try {
    const uid = req.user._id;
    const { pid } = req.params;

    const productBought = await cartService.productAlreadyBuy(uid, pid);

    res.status(200).json({ message: productBought });
  } catch (error) {
    next(error);
  }
}

export {
  addProductToCart,
  deleteProductFromCart,
  getCartOfActiveUser,
  getProductsOfCartById,
  productAlreadyAddedToCart,
  buyCart,
  getHistoryBuysOfCurrentUser,
  productIsBought,
};
