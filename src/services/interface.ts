import { ICreateOrder } from "../repositories/types";
import {
  ICreateProductSrv,
  ICreateUserSrv,
  IOrderSrv,
  IProductSrv,
  IUpdateProductSrv,
  IUserSrv,
} from "./types";

export interface IUserService {
  createUser(newUser: ICreateUserSrv): Promise<IUserSrv>;
  login(username: string, password: string): Promise<string>;
  findById(id: string): Promise<IUserSrv>;
}

export interface IProductService {
  createProduct(newProduct: ICreateProductSrv): Promise<IProductSrv>;
  getAllProducts(): Promise<IProductSrv[]>;
  getProductById(id: string): Promise<IProductSrv>;
  updateProduct(
    productId: string,
    product: IUpdateProductSrv
  ): Promise<IProductSrv>;
  deleteProduct(id: string): Promise<boolean>;
}

export interface IOrderService {
  createOrder(newOrder: ICreateOrder): Promise<IOrderSrv>;
  getOrderByOrderId(id: string): Promise<IOrderSrv>;
  updateSessionId(sessionId: string, status: string): Promise<IOrderSrv>;
}
