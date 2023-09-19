//Imports
import express from "express";
import productRoute from "./routes/productsRoute.js";
import cartRoute from "./routes/cartRoute.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

//Variables
const app = express();

//Configuration
app.use(express.json());

app.use(express.urlencoded({ extended: true }));



//Routes
app.use("/api/carts", cartRoute);
app.use("/api/products", productRoute);

//Global middlewares
app.use(errorHandlerMiddleware);

app.listen(8080, () => {
  console.log(`Listening on port 8080`);
});
