import express from "express";

import {
  deleteCurrentUser,
  updateCurrentUser
} from "../controllers/user.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

import {
  multerUploads,
  processImage,
} from "../middlewares/uploadImages.middleware.js";

const router = express.Router();

router.delete("/", isAuthenticated, deleteCurrentUser);

router.put(
  "/",
  isAuthenticated,
  multerUploads,
  processImage,
  updateCurrentUser
);

export default router;
