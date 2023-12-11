import productService from "../services/Product.service.js";
import messageService from "../services/Message.service.js";
import categoryService from "../services/Category.service.js";
import developerService from "../services/Developer.service.js";

async function getAllProductsHandler(io, socket) {
  socket.on("getAllProducts", async () => {
    const products = await productService.getAll();
    io.sockets.emit("updatedProducts", products);
  });
}

async function getAllCategoriesHandler(io, socket) {
  socket.on("getAllCategories", async () => {
    const categories = await categoryService.getAll();
    io.sockets.emit("updatedCategories", categories);
  });
}

async function getAllDevelopersHandler(io, socket) {
  socket.on("getAllDevelopers", async () => {
    const developers = await developerService.getAll();
    io.sockets.emit("updatedDevelopers", developers);
  });
}

async function getRandomBuy(io, socket) {
  socket.on("productBuy", async (user, product) => {
    const bought = {
      fullname: user.firstName + " " + user.lastName,
      product: product,
    };

    io.sockets.emit("newBought", bought);
  });
}

async function messagesHandler(io, socket) {
  socket.on("messageSent", async (message) => {
    await messageService.create(message);
    const messages = await messageService.getAll();
    io.sockets.emit("newMessages", messages);
  });

  socket.on("getMessages", async () => {
    const messages = await messageService.getAll();
    io.sockets.emit("newMessages", messages);
  });
}

export {
  getAllProductsHandler,
  messagesHandler,
  getRandomBuy,
  getAllCategoriesHandler,
  getAllDevelopersHandler,
};
