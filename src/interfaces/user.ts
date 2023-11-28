import mongoose, { Document } from "mongoose";
import { IAddress } from "../dto/order";

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
  address: IAddress;
  order_id: string;
  total: number;
  status: string;
  session_id: string;
}

export interface UserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): boolean;
}
