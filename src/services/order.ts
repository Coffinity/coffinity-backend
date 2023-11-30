import { IOrderRepository } from "../repositories/interface";
import { ICreateOrder } from "../repositories/types";
import { IOrderService } from "./interface";
import { IOrderSrv } from "./types";

export default class OrderService implements IOrderService {
  private orderRepo: IOrderRepository;
  constructor(orderRepo: IOrderRepository) {
    this.orderRepo = orderRepo;
  }

  createOrder: IOrderService["createOrder"] = async (newOrder) => {
    const order: ICreateOrder = {
      userId: newOrder.userId,
      total: newOrder.total,
      items: newOrder.items,
      address: newOrder.address,
      session_id: newOrder.session_id,
      order_id: newOrder.order_id,
      status: newOrder.status,
    };

    const result = await this.orderRepo.createOrder(order);
    const orderResult: IOrderSrv = {
      id: result.id,
      userId: result.userId,
      address: result.address,
      items: result.items,
      total: result.total,
      order_id: result.order_id,
      session_id: result.session_id,
      status: result.status,
    };
    return orderResult;
  };

  getOrderByOrderId: IOrderService["getOrderByOrderId"] = async (id) => {
    try {
      const result = await this.orderRepo.getByOrderId(id);
      const orderResult: IOrderSrv = {
        id: result.id,
        userId: result.userId,
        address: result.address,
        items: result.items,
        total: result.total,
        order_id: result.order_id,
        session_id: result.session_id,
        status: result.status,
      };
      return orderResult;
    } catch (error) {
      throw error;
    }
  };

  updateSessionId: IOrderService["updateSessionId"] = async (
    sessionId,
    status
  ) => {
    try {
      const result = await this.orderRepo.updateSessionId(sessionId, status);
      const orderResult: IOrderSrv = {
        id: result.id,
        userId: result.userId,
        address: result.address,
        items: result.items,
        total: result.total,
        order_id: result.order_id,
        session_id: result.session_id,
        status: result.status,
      };
      return orderResult;
    } catch (error) {
      throw error;
    }
  };
}
