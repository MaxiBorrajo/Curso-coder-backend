import express from "express";

import {
  deleteUser,
  updateCurrentUser,
  getCurrentUser
} from "../controllers/userController.js";

import { isAuthenticated } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getCurrentUser);

router.delete("/", deleteUser);

router.put("/", isAuthenticated, updateCurrentUser);

export default router;
