import express from "express";

import {
  addProductToCart,
  deleteProductFromCart,
  getCartOfActiveUser,
  getProductsOfCartById,
  productAlreadyAddedToCart,
  buyCart,
  getHistoryBuysOfCurrentUser,
  productIsBought
} from "../controllers/cart.controller.js";

import { body_must_contain_attributes } from "../middlewares/validationData.middleware.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  body_must_contain_attributes(["idProduct"]),
  addProductToCart
);

router.get("/:cid/products", isAuthenticated, getProductsOfCartById);

router.get("/:cid/product/:pid", isAuthenticated, productAlreadyAddedToCart);

router.delete("/:aid", isAuthenticated, deleteProductFromCart);

router.get("/", isAuthenticated, getCartOfActiveUser);

router.get("/:cid/buy", isAuthenticated, buyCart);

router.get("/history", isAuthenticated, getHistoryBuysOfCurrentUser);

router.get("/product/:pid/buy", isAuthenticated, productIsBought);

export default router;
