import express from "express";

import { body_must_contain_attributes } from "../middlewares/validationData.middleware.js";

import {
  getRatingOfProduct,
  rateProduct,
  getMostRatedProductsOfLastWeek,
  getRatingOfCurrentUser,
} from "../controllers/rating.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  body_must_contain_attributes(["idProduct", "rating"]),
  isAuthenticated,
  rateProduct
);

router.get("/recent", getMostRatedProductsOfLastWeek);

router.get("/:pid", getRatingOfProduct);

router.get("/:pid/user", isAuthenticated, getRatingOfCurrentUser);


export default router;
