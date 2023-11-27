import express from "express";

import {
  deleteComment,
  getCommentOfCurrentUser,
  getCommentsOfProduct,
  postComment,
  updateComment,
} from "../controllers/comment.controller.js";

import { body_must_contain_attributes } from "../middlewares/validationData.middleware.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/user/product/:pid", isAuthenticated, getCommentOfCurrentUser);

router.get("/product/:pid", getCommentsOfProduct);

router.post(
  "/",
  isAuthenticated,
  body_must_contain_attributes(["idProduct", "comment"]),
  postComment
);

router.put(
  "/:cid",
  isAuthenticated,
  body_must_contain_attributes(["comment"]),
  updateComment
);

router.delete("/:cid", isAuthenticated, deleteComment);

export default router;
