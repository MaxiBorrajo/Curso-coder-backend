//Imports
import { productManager } from "./classes/ProductManager.js";

import express from "express";

//Variables
const app = express();

//Configuration
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;

    const products = await productManager.getProducts(limit);

    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productManager.getProductById(pid);

    if (product) {
      res.status(200).json({ product: product });
    } else {
      res.status(400).json({ product: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.listen(8080, () => {
  console.log(`Listening on port 8080`);
});
