import express, { Request } from "express";
import DBConnect from "./utils/mongo";
import "dotenv/config";
import cors from "cors";

import JWTMiddleware from "./middleware/jwt";
import OrderHandler from "./handlers/order";
import UserRepository from "./repositories/user";
import UserService from "./services/user";
import UserHandler from "./handlers/user";
import ProductRepository from "./repositories/products";
import ProductService from "./services/product";
import ProductHandler from "./handlers/product";
import OrderRepository from "./repositories/order";
import OrderService from "./services/order";

const app = express();
const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userHandler = new UserHandler(userService);

const productRepo = new ProductRepository();
const productService = new ProductService(productRepo);
const productHandler = new ProductHandler(productService);

const orderRepo = new OrderRepository();
const orderSrv = new OrderService(orderRepo);
const orderHandler = new OrderHandler(orderSrv);

const PORT = Number(process.env.PORT || 8800);

// stripe webhook
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  orderHandler.webhookHandler
);
app.use(express.json({ limit: "50mb" }));
app.use(cors());
const userRouter = express.Router();
const productRouter = express.Router();
const authRouter = express.Router();

const mineRouter = express.Router();
const jwtMiddleware = new JWTMiddleware();

app.get("/", (req, res) => {
  return res.status(200).send("Hello").end();
});

// Auth
app.use("/auth", authRouter);
authRouter.post("/login", userHandler.loginHandler);

// User
app.use("/users", userRouter);

userRouter.get("/", (req: Request<{}, string>, res) => {
  return res.status(200).send("Hello").end();
});
userRouter.post("/", userHandler.registrationHandler);

//Mine
app.use("/mine", mineRouter);
mineRouter.get("/info", jwtMiddleware.auth, userHandler.getUserInfoHandler);
// mineRouter.put("/carts", jwtMiddleware.auth, updateCartHandler);
// mineRouter.get("/carts", jwtMiddleware.auth, getCartHandler);
// mineRouter.post("/orders", jwtMiddleware.auth, createOrderHandler);
mineRouter.post("/checkout", jwtMiddleware.auth, orderHandler.checkoutHandler);
mineRouter.get(
  "/order/:id",
  jwtMiddleware.auth,
  orderHandler.getCheckoutInfoHandler
);
// Product
app.use("/products", productRouter);
productRouter.post("/", productHandler.createProductHandler);
productRouter.get("/", productHandler.getAllProductsHandler);
productRouter.get("/:id", productHandler.getProductHandler);
productRouter.delete(
  "/:id",
  jwtMiddleware.auth,
  productHandler.deleteProductHandler
);

DBConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);

    console.log("Error connecting to database");

    process.exit(1);
  });
