import mongoose from "mongoose";
import { IOrder } from "../interfaces/user";

const orderSchema = new mongoose.Schema(
  {
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
    address: {
      fullname: { type: String, required: true },
      address_line: { type: String, required: true },
      province: { type: String, required: true },
      district: { type: String, required: true },
      postcode: { type: String, required: true },
      phone_number: { type: String, required: true },
    },
    order_id: { type: String, required: true },
    total: Number,
    status: {
      type: String,
      default: "pending",
    },
    session_id: { type: String, required: true },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<IOrder>("Order", orderSchema);

export default OrderModel;
