import mongoose, { Document } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IOrder {
  userId: string;
  items: {
    name: string;
    description: string;
    image: string;
    type: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: string;
}
interface ICart {
  items: {
    productId: mongoose.Types.ObjectId;
    size: string;
    quantity: number;
  }[];
  total: number;
}

interface IAddress {
  address_line: string;
  province: string;
  district: string;
  postcode: string;
}

export interface UserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): boolean;
}
