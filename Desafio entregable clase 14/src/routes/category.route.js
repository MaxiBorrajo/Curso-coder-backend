import express from "express";

import {
  addProductToCategory,
  createCategory,
  deleteCategory,
  deleteProductFromCategory,
  getCategories,
  getProductsByCategory,
} from "../controllers/category.controller.js";

import { body_must_contain_attributes } from "../middlewares/validationData.middleware.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

import isAdmin from "../middlewares/checkRole.middleware.js";

const router = express.Router();

router.get("/", getCategories);

router.get("/:ctid/products", getProductsByCategory);

router.post(
    "/",
    isAuthenticated,
    isAdmin,
    body_must_contain_attributes(["category"]),
    createCategory
  );
  

router.post(
  "/product",
  isAuthenticated,
  isAdmin,
  body_must_contain_attributes(["idProduct", "idCategory"]),
  addProductToCategory
);

router.delete("/:ctid/product/:pid", isAuthenticated, isAdmin, deleteProductFromCategory);

router.delete("/:ctid", isAuthenticated, isAdmin, deleteCategory);

export default router;
