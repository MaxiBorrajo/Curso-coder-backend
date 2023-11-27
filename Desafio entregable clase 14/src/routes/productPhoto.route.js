import express from "express";

import { body_must_contain_attributes } from "../middlewares/validationData.middleware.js";

import {
  addPhotoToProduct,
  deletePhotoProduct,
  getPhotosOfProduct,
} from "../controllers/productPhoto.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

import isAdmin from "../middlewares/checkRole.middleware.js";

import {
  multerUploads,
  processImage,
} from "../middlewares/uploadImages.middleware.js";

const router = express.Router();

router.post(
  "/",
  multerUploads,
  processImage,
  body_must_contain_attributes(["idProduct"]),
  isAuthenticated,
  isAdmin,
  addPhotoToProduct
);

router.get("/product/:pid", isAuthenticated, getPhotosOfProduct);

router.delete("/:ppid", isAuthenticated, isAdmin, deletePhotoProduct);

export default router;
