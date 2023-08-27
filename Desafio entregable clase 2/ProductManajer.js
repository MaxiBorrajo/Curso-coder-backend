class ProductManager {
  constructor(products = []) {
    this.products = products;
  }

  addProduct(newProduct) {
    const validProduct = this.validateProduct(newProduct);

    const repeatedCode = this.products.find(
      (product) => product.code === newProduct.code
    );

    if (validProduct && !repeatedCode) {
      newProduct.id = this.products.length
        ? this.products[this.products.length - 1].id + 1
        : 1;

      this.products.push(newProduct);
    } else {
      console.error("Invalid product");
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

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    let foundProduct;

    this.products.find((product) => {
      if (product.id === id) {
        foundProduct = { ...product };
      }
    });

    if (foundProduct) {
      return foundProduct;
    } else {
      console.error("Not found");
    }
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

const productManager = new ProductManager();

console.log("productos hasta ahora", productManager.getProducts());

const newProduct = new Product(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

productManager.addProduct(newProduct);

console.log("producto añadido", productManager.getProducts());

//deberia fallar por code repetido
productManager.addProduct(newProduct);

//creo un producto donde le falta un campo para que probar validateProduct()
const secondProduct = new Product(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "bbb123",
  32
);

//deberia fallar
productManager.addProduct(secondProduct);

//Deberia funcionar
console.log("producto con id 1", productManager.getProductById(1));

//Deberia fallar
productManager.getProductById(100);

//creo un producto para ver si funciona el id autoincremental
const thirdProduct = new Product(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "bbb123",
  32
);

productManager.addProduct(thirdProduct);

console.log("productos hasta ahora", productManager.getProducts());
