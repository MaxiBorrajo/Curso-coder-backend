import { productManager } from "../entities/ProductManager.js";

async function getAllProducts(req, res, next) {
  try {
    const { limit } = req.query;

    const products = await productManager.getProducts(limit);

    res.status(200).json({ products: products });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const { pid } = req.params;

    const product = await productManager.getProductById(pid);

    if (product) {
      res.status(200).json({ product: product });
    } else {
      res.status(400).json({ product: "Not found" });
    }
  } catch (error) {
    next(error);
  }
}

async function addProduct(req, res, next) {
  try {
    let newProduct = { ...req.body, thumbnails: [] };

    if (req.files) {
      req.files.forEach((file, index) => {
        newProduct.thumbnails.push({ idPhoto: index, url: file.path });
      });
    }

    const result = await productManager.addProduct(newProduct);

   

    res.status(201).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function updateProductById(req, res, next) {
  try {
    const { pid } = req.params;

    let newProductInfo = { ...req.body};

    const result = await productManager.updateProductById(pid, newProductInfo);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function deleteProductById(req, res, next) {
  try {
    const { pid } = req.params;

    const result = await productManager.deleteProductById(pid);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function addImagesToProductById(req, res, next) {
  try {
    if (req.files) {
      const { pid } = req.params;

      req.files.forEach(async (file) => {
        await productManager.addImageToProductById(pid, file.path);
      });

      res.status(201).json({ message: "Image/s added" });
    } else {
      throw new Error("At least one image must be uploaded");
    }
  } catch (error) {
    next(error);
  }
}

async function deleteImageFromProductById(req, res, next) {
  try {
      const { pid, imageId } = req.params;

      const result = await productManager.deleteImageOfProductById(pid, imageId)

      res.status(201).json({ message: result });
  } catch (error) {
    next(error);
  }
}


export {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  addImagesToProductById,
  deleteImageFromProductById
};
