import { OrderDocument } from "../interfaces/order";
import { ProductDocument } from "../interfaces/product";
import { UserDocument } from "../interfaces/user";
import {
  ICreateOrder,
  ICreateProduct,
  ICreateUser,
  IUpdateProduct,
} from "./types";

export interface IUserRepository {
  createUser(user: ICreateUser): Promise<UserDocument>;
  findByUsername(username: string): Promise<UserDocument>;
  findById(id: string): Promise<UserDocument>;
}

export interface IProductRepository {
  createProduct(newProduct: ICreateProduct): Promise<ProductDocument>;
  getAllProducts(): Promise<ProductDocument[]>;
  getProductById(id: string): Promise<ProductDocument>;
  updateProduct(
    productId: string,
    product: IUpdateProduct
  ): Promise<ProductDocument>;
  deleteProduct(id: string): Promise<boolean>;
}

export interface IOrderRepository {
  createOrder(order: ICreateOrder): Promise<OrderDocument>;
  getByOrderId(id: string): Promise<OrderDocument>;
  updateSessionId(sessionId: string, status: string): Promise<OrderDocument>;
}
