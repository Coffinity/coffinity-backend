import { ICreateOrderDTO } from "../dto/order";
import { IOrder } from "../interfaces/user";
import OrderModel from "../models/order";
import ProductModel from "../models/product";

export async function createOrder(userId: string, input: ICreateOrderDTO) {
  const { items } = input;
  let total = 0;

  const orderItems = await Promise.all(
    items.map(async (item) => {
      const product = await ProductModel.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      total += product.price * item.quantity;

      return {
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      };
    })
  );

  const newOrder = { userId, total: total, items: orderItems };
  try {
    const order = await OrderModel.create(newOrder);
    return order;
  } catch (err) {
    throw err;
  }
}
