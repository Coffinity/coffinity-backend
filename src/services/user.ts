import { omit } from "lodash";
import { ICreateUserDTO } from "../dto/user";
import UserModel from "../models/user";
import CartModel from "../models/cart";

export async function createUser(input: ICreateUserDTO) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (err) {
    throw err;
  }
}

export async function findByUserId(userId: string) {
  try {
    const user = await UserModel.findById({ _id: userId });
    if (!user) {
      throw new Error("username not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
}

export async function findByUsername(username: string) {
  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      throw new Error("username not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
}

export async function updateCart(
  userId: string,
  productId: string,
  quantity: number
) {
  try {
    const updatedCart = await CartModel.findOneAndUpdate(
      { userId, "items.productId": productId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    ).populate("items.productId", "name");

    if (!updatedCart) {
      // If the product doesn't exist in the cart, add it
      const newCartItem = { productId, quantity };
      const newCart = await CartModel.findOneAndUpdate(
        { userId },
        { $addToSet: { items: newCartItem } },
        { new: true, upsert: true }
      );

      return newCart;
    }
    return updatedCart;
  } catch (error) {
    throw error;
  }
}

export async function getUserCart(userId: string) {
  try {
    const userCart = await CartModel.findOne({ userId }).populate({
      path: "items.productId",
      select: "name description image type",
    });

    return userCart;
  } catch (error) {
    throw error;
  }
}
