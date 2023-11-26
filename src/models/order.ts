import mongoose from "mongoose";
import { IOrder } from "../interfaces/user";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: Number,
  status: {
    type: String,
    default: "pending",
  },
});

const OrderModel = mongoose.model<IOrder>("Order", orderSchema);

export default OrderModel;
