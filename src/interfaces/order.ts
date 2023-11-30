import { Document } from "mongoose";
import { IAddress } from "../dto/order";

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
export interface OrderDocument extends IOrder, Document {
  createdAt: Date;
  updatedAt: Date;
}
