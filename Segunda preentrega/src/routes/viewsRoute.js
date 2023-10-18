import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/products", (req, res) => {
  res.render("products");
});

router.get("/carts/:cid", (req, res) => {
  const cartId = req.params.cid;
  res.render("carts", { cartId });
});

router.get("/products/:pid", (req, res) => {
  const productId = req.params.pid;
  res.render("product", { productId });
});

router.get("/realtimeProducts", (req, res) => {
  res.render("realtimeProducts");
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;
