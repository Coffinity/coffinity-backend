import { IAddress, ICreateOrderDTO } from "../dto/order";
import { IOrder } from "../interfaces/user";
import OrderModel from "../models/order";
import ProductModel from "../models/product";

export async function createOrder(
  userId: string,
  total: number,
  newOrders: {
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
  }[],
  address: IAddress,
  session_id: string,
  order_id: string,
  status?: string
) {
  try {
    const orderResult = {
      userId: userId,
      total: total,
      address: address,
      order_id,
      session_id,
      status,
      items: newOrders,
    };
    const order = await OrderModel.create(orderResult);
    return order;
  } catch (err) {
    throw err;
  }
}

export async function getOrderByOrderId(orderId: string) {
  try {
    const order = await OrderModel.findOne({ order_id: orderId });
    return order;
  } catch (error) {
    throw error;
  }
}
export async function updateSessionId(sessionId: string, status: string) {
  try {
    const order = await OrderModel.findOneAndUpdate(
      { session_id: sessionId },
      { status: status },
      { new: true }
    );
    return order;
  } catch (error) {
    throw error;
  }
}
