import express from "express";

import {
  addProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
  getProductsOwnedByUser
} from "../controllers/product.controller.js";

import { body_must_contain_attributes } from "../middlewares/validationData.middleware.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

import isAdmin from "../middlewares/checkRole.middleware.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/library", isAuthenticated, getProductsOwnedByUser);

router.get("/:pid", getProductById);

router.post(
  "/",
  isAuthenticated,
  isAdmin,
  body_must_contain_attributes([
    "title",
    "description",
    "price",
    "releaseDate",
  ]),

  addProduct
);

router.put("/:pid", isAuthenticated, isAdmin, updateProductById);

router.delete("/:pid", isAuthenticated, isAdmin, deleteProductById);

export default router;
