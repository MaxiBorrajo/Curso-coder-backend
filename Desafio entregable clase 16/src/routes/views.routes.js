import { Router } from "express";

import {
  isAuthenticated,
  isNotAuthenticated,
} from "../middlewares/auth.middleware.js";

import isAdmin from "../middlewares/checkRole.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/products", isAuthenticated, (req, res) => {
  res.render("products");
});

router.get("/carts/:cid", isAuthenticated, (req, res) => {
  const cartId = req.params.cid;
  res.render("carts", { cartId });
});

router.get("/products/:pid", (req, res) => {
  const productId = req.params.pid;
  res.render("product", { productId });
});

router.get("/realtimeProducts", isAuthenticated, isAdmin, (req, res) => {
  res.render("realtimeProducts");
});

router.get("/chat", isAuthenticated, (req, res) => {
  res.render("chat");
});

router.get("/login", isNotAuthenticated, (req, res) => {
  res.render("login");
});

router.get("/register", isNotAuthenticated, (req, res) => {
  res.render("register");
});

router.get("/profile", isAuthenticated, (req, res) => {
  res.render("profile");
});

router.get("/categories", (req, res) => {
  res.render("categories");
});

router.get("/developers/:did", (req, res) => {
  const developerId = req.params.did;
  res.render("developers", { developerId });
});

router.get("/categories/:ctid", (req, res) => {
  const categoryId = req.params.ctid;
  res.render("categories", { categoryId });
});

router.get("/developers", (req, res) => {
  res.render("developers");
});

router.get("/opinions", (req, res) => {
  res.render("opinions");
});

export default router;
