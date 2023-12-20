//Imports
import "dotenv/config";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import productRoute from "./routes/product.routes.js";
import cartRoute from "./routes/cart.routes.js";
import sessionRoute from "./routes/session.routes.js";
import userRoute from "./routes/user.routes.js";
import ratingRoute from "./routes/rating.routes.js";
import developerRoute from "./routes/developer.routes.js";
import viewsRoute from "./routes/views.routes.js";
import customRoute from "./routes/customRoutes.routes.js"; 
import categoryRoute from "./routes/category.routes.js";
import errorHandlerMiddleware from "./middlewares/error.middleware.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import {
  getAllProductsHandler,
  messagesHandler,
  getRandomBuy,
  getAllCategoriesHandler,
  getAllDevelopersHandler,
} from "./handlers/handlers.js";
import { Database } from "./config/database.connection.js";
import passport from "passport";
import { dirname } from "path";
import { fileURLToPath } from "url"; 
import  logger  from "./winston.config.js"; 

//Variables
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
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
      mongoUrl: process.env.MONGO_DB_URI,
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
app.use("/api/categories", categoryRoute);
app.use("/api/developers", developerRoute);
app.use("/api", customRoute)
app.use("/", viewsRoute);

//Global middlewares
app.use(errorHandlerMiddleware);

//Servers
const httpServer = app.listen(process.env.PORT, async () => {
  await Database.databaseConnection();
  logger.info(`Listening on port ${process.env.PORT}`);
});

const socketServer = new Server(httpServer);

const onConnection = async (socket) => {
  await getAllProductsHandler(socketServer, socket);
  await messagesHandler(socketServer, socket);
  await getRandomBuy(socketServer, socket);
  await getAllCategoriesHandler(socketServer, socket);
  await getAllDevelopersHandler(socketServer, socket);
};

socketServer.on("connection", onConnection);

export default app;
