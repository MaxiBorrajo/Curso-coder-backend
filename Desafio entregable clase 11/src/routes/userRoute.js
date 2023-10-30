import express from "express";

import {
  deleteUser,
  updateCurrentUser,
} from "../controllers/userController.js";

const router = express.Router();

router.delete("/", deleteUser);

router.put("/", updateCurrentUser);

export default router;
