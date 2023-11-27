import { RequestHandler } from "express";
import { ICreateOrderDTO, IOrderDTO } from "../dto/order";
import { createOrder } from "../services/order";
import { AuthStatus } from "../middleware/jwt";

export const createOrderHandler: RequestHandler<
  {},
  IOrderDTO | { message: string },
  ICreateOrderDTO,
  {},
  AuthStatus
> = async (req, res) => {
  const userId = res.locals.user.id;
  try {
    const order = await createOrder(userId, req.body);
    console.log(order.userId);

    return res.status(201).json(order.toJSON()).end();
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "internal server error" });
  }
};
