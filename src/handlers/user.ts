import { RequestHandler, Response } from "express";
import { IAccessToken, ICreateUserDTO, ILogin, IUserDTO } from "../dto/user";
import {
  createUser,
  findByUsername,
  getUserCart,
  updateCart,
} from "../services/user";
import "dotenv/config";
import { sign } from "jsonwebtoken";
import { IAddItemToCartDTO } from "../dto/cart";
import { AuthStatus } from "../middleware/jwt";
import { getProductById } from "../services/product";

export const registrationHandler: RequestHandler<
  undefined,
  IUserDTO | { message: string },
  ICreateUserDTO
> = async (req, res) => {
  try {
    const { _id, username, email, createdAt } = await createUser(req.body);
    return res.status(201).json({ id: _id, username, email, createdAt });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "internal server error" });
  }
};

export const loginHandler: RequestHandler<
  {},
  IAccessToken | { message: string },
  ILogin
> = async (req, res) => {
  try {
    const user = await findByUsername(req.body.username);

    const userId: string = user._id;
    const isAdmin: boolean = user.isAdmin;

    const isOk = user.comparePassword(req.body.password);
    if (!isOk) {
      throw new Error("wrong username or password");
    }
    const accessToken = sign(
      { userId, isAdmin },
      process.env.JWT_SECRET as string,
      {
        algorithm: "HS512",
        expiresIn: "12h",
        issuer: "DHAMAJATI",
        subject: "user-credential",
      }
    );
    return res.status(201).json({ accessToken: accessToken }).end();
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "internal server error" });
  }
};

export const updateCartHandler: RequestHandler<
  undefined,
  { message: string },
  IAddItemToCartDTO,
  {},
  AuthStatus
> = async (req, res) => {
  try {
    const userId = res.locals.user.id;

    const { productId, quantity } = req.body;
    const product = await getProductById(productId);
    if (!product) {
      throw new Error("product not found !");
    }
    const result = await updateCart(userId, productId, quantity);
    console.log(result);

    return res.status(200).json({ message: "success" });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "internal server error" });
  }
};

export const getCartHandler: RequestHandler<
  undefined,
  { message: string },
  {},
  {},
  AuthStatus
> = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const result = await getUserCart(userId);
    console.log(result);

    return res.status(409).json(result?.toJSON());
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "internal server error" });
  }
};
