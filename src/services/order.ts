import { ICreateOrderDTO } from "../dto/order";
import { IOrder } from "../interfaces/user";
import OrderModel from "../models/order";
import ProductModel from "../models/product";

export async function createOrder(userId: string, input: ICreateOrderDTO) {
  const { items } = input;
  let total = 0;

  const productIdArr = items.map((item) => {
    return item.productId;
  });

  const productList = await ProductModel.find({ _id: { $in: productIdArr } });
  const productDetail = productList.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      quantity: 0,
    };
  });

  productDetail.map((product) => {
    items.map((item) => {
      if (item.productId === product.id) {
        product.quantity = item.quantity;
        total += product.price * product.quantity;
      }
    });
  });
  try {
    const newOrder = productDetail.map((item) => {
      return {
        name: item.name,
        description: item.description,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      };
    });
    const orderResult = {
      userId: userId,
      total: total,
      items: newOrder,
    };
    const order = await OrderModel.create(orderResult);
    return order;
  } catch (err) {
    throw err;
  }
}
