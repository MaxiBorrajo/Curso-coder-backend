import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(newProduct) {
    try {
      const validProduct = this.validateProduct(newProduct);

      const products = await this.getProducts();

      const repeatedCode = products.find(
        (product) => product.code === newProduct.code
      );

      if (!validProduct || repeatedCode) {
        throw new error(
          "Invalid product due to lack of information or repeated code"
        );
      }

      newProduct.id = products.length
        ? products[products.length - 1].id + 1
        : 1;

      products.push(newProduct);

      fs.promises.writeFile(this.path, JSON.stringify(products)).then(() => {
        return "Product added";
      });
    } catch (error) {
      return error;
    }
  }

  validateProduct(product) {
    return (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock
    );
  }

  async getProductsFromFile() {
    try {
      if (!fs.existsSync(this.path)) {
        const products = [];

        await fs.promises.writeFile(this.path, JSON.stringify(products));

        return products;
      }

      const products = JSON.parse(await fs.promises.readFile(this.path));

      return products;
    } catch (error) {
      return error;
    }
  }

  async getProducts(limit) {
    try {
      const products = await this.getProductsFromFile();

      return products.slice(0, limit);
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      
      const foundProduct = products.find((product) => product.id === +id);

      if (foundProduct) {
        return foundProduct;
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  }

  async updateProductById(id, newProductInfo) {
    try {
      if (newProductInfo.id || newProductInfo.code) {
        throw new Error("Cannot change product id or code");
      }

      let product = { ...(await this.getProductById(id)) };

      const products = await this.getProducts();

      let found_index = products.findIndex((_product) => _product.id === id);

      products[found_index] = { ...product, ...newProductInfo };

      fs.promises.writeFile(this.path, JSON.stringify(products)).then(() => {
        return "Product updated";
      });
    } catch (error) {
      return error;
    }
  }

  async deleteProductById(id) {
    try {
      const products = await this.getProducts();

      await this.getProductById(id);

      const index = products.findIndex((_product) => _product.id === id);

      products.splice(index, 1);

      fs.promises.writeFile(this.path, JSON.stringify(products)).then(() => {
        return "Product deleted";
      });
    } catch (error) {
      return error;
    }
  }
}

export const productManager = new ProductManager("products.json");
