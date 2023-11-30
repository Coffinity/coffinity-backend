import OrderModel from "../models/order";
import { IOrderRepository } from "./interface";
import { ICreateOrder } from "./types";

export default class OrderRepository implements IOrderRepository {
  createOrder: IOrderRepository["createOrder"] = async (
    order: ICreateOrder
  ) => {
    try {
      const result = await OrderModel.create(order);
      return result;
    } catch (err) {
      throw err;
    }
  };
  getByOrderId: IOrderRepository["getByOrderId"] = async (id: string) => {
    try {
      const result = await OrderModel.findOne({ order_id: id });
      if (!result) {
        throw new Error("order not found");
      }
      return result;
    } catch (error) {
      throw error;
    }
  };
  updateSessionId: IOrderRepository["updateSessionId"] = async (
    sessionId: string,
    status: string
  ) => {
    try {
      const result = await OrderModel.findOneAndUpdate(
        { session_id: sessionId },
        { status: status },
        { new: true }
      );
      if (!result) {
        throw new Error("order not found");
      }
      return result;
    } catch (error) {
      throw error;
    }
  };
}
