import express, { Request } from "express";
import DBConnect from "./utils/mongo";
import "dotenv/config";
import cors from "cors";
import {
  getCartHandler,
  getUserInfo,
  loginHandler,
  registrationHandler,
  updateCartHandler,
} from "./handlers/user";
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductHandler,
} from "./handlers/product";
import JWTMiddleware from "./middleware/jwt";
import { createOrderHandler } from "./handlers/order";

const app = express();

const PORT = Number(process.env.PORT || 8800);

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
authRouter.post("/login", loginHandler);

// User
app.use("/users", userRouter);

userRouter.get("/", (req: Request<{}, string>, res) => {
  return res.status(200).send("Hello").end();
});
userRouter.post("/", registrationHandler);

//Mine
app.use("/mine", mineRouter);
mineRouter.get("/info", jwtMiddleware.auth, getUserInfo);
mineRouter.put("/carts", jwtMiddleware.auth, updateCartHandler);
mineRouter.get("/carts", jwtMiddleware.auth, getCartHandler);
mineRouter.post("/orders", jwtMiddleware.auth, createOrderHandler);

// Product
app.use("/products", productRouter);
productRouter.post("/", createProductHandler);
productRouter.get("/", getAllProductsHandler);
productRouter.get("/:id", getProductHandler);
productRouter.delete("/:id", jwtMiddleware.auth, deleteProductHandler);

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
