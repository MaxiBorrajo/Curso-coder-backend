import { cartManager } from "../entities/CartManager.js";

async function addProductToCartById(req, res, next) {
  try {
    const { cid, pid } = req.params;

    const result = await cartManager.addProductToCartById(cid, pid);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function createCart(req, res, next) {
  try {
    const result = await cartManager.addCart(req.body);

    res.status(201).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function getProductsOfCartById(req, res, next) {
  try {
    const { cid } = req.params;

    const cart = await cartManager.getCartById(cid);

    res.status(200).json({ products: cart.products });
  } catch (error) {
    next(error);
  }
}
export { addProductToCartById, createCart, getProductsOfCartById };
