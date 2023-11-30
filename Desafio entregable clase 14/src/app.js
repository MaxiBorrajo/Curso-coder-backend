//Imports
import "dotenv/config";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";
import sessionRoute from "./routes/session.route.js";
import userRoute from "./routes/user.route.js";
import ratingRoute from "./routes/rating.route.js";
import productPhotoRoute from "./routes/productPhoto.route.js";
import viewsRoute from "./routes/views.route.js";
import commentRoute from "./routes/comment.route.js";
import categoryRoute from "./routes/category.route.js";
import errorHandlerMiddleware from "./middlewares/error.middleware.js";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { getAllProductsHandler, messagesHandler } from "./handlers/handlers.js";
import databaseConnection from "./config/database.connection.js";
import passport from "passport";

//Variables
const app = express();

//Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 15,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/carts", cartRoute);
app.use("/api/products", productRoute);
app.use("/api/sessions", sessionRoute);
app.use("/api/users", userRoute);
app.use("/api/ratings", ratingRoute);
app.use("/api/photos", productPhotoRoute);
app.use("/api/comments", commentRoute);
app.use("/api/categories", categoryRoute);
app.use("/", viewsRoute);

//Global middlewares
app.use(errorHandlerMiddleware);

//Servers
const httpServer = app.listen(8080, () => {
  console.log(`Listening on port 8080`);
  databaseConnection();
});

const socketServer = new Server(httpServer);

const onConnection = async (socket) => {
  await getAllProductsHandler(socketServer, socket);
  await messagesHandler(socketServer, socket);
};

socketServer.on("connection", onConnection);

export default app;
