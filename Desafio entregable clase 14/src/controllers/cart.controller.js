import cartService from "../services/Cart.service.js";
import addedService from "../services/Added.service.js";
import { customResponse } from "../utils.js";

async function addProductToCart(req, res, next) {
  try {
    const data = {
      ...req.body,
      ...{
        idUser: req.user._id,
      },
    };

    const result = await addedService.create(data);

    return customResponse(res, 201, result);
  } catch (error) {
    next(error);
  }
}

async function getProductsOfCartById(req, res, next) {
  try {
    const { page } = req.query;
    const { cid } = req.params;

    const result = await addedService.getProductsOfCart(cid, 10, page);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function deleteProductFromCart(req, res, next) {
  try {
    const { aid } = req.params;

    const result = await addedService.deleteById(aid);

    return customResponse(res, 200, result);
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

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function productAlreadyAddedToCart(req, res, next) {
  try {
    const uid = req.user._id;
    const { cid, pid } = req.params;

    const result = await addedService.productAlreadyAdded(cid, pid, uid);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function buyCart(req, res, next) {
  try {
    const uid = req.user._id;
    const { cid } = req.params;

    const result = await cartService.buyCartById(cid, uid);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function getHistoryBuysOfCurrentUser(req, res, next) {
  try {
    const uid = req.user._id;
    const { limit } = req.query;

    const result = await cartService.getHistoryOfBuys(uid, limit);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function productIsBought(req, res, next) {
  try {
    const uid = req.user._id;
    const { pid } = req.params;

    const result = await cartService.productAlreadyBuy(uid, pid);

    return customResponse(res, 200, result);
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
