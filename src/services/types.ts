import { IAddress } from "../dto/order";

export interface ICreateProductSrv {
  name: string;
  description: string;
  image: string;
  type: string;
  price: number;
  stockQuantity: number;
}

export interface IProductSrv {
  id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  price: number;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateProductSrv {
  name: string;
  description: string;
  image: string;
  type: string;
  price: number;
  stockQuantity: number;
}
export interface ICreateUserSrv {
  email: string;
  username: string;
  password: string;
}

export interface IOrderSrv {
  id: string;
  userId: string;
  total: number;
  items: {
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  address: IAddress;
  session_id: string;
  order_id: string;
  status?: string;
}

export interface ICreateOrderSrv {
  userId: string;
  total: number;
  items: {
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  address: IAddress;
  session_id: string;
  order_id: string;
  status?: string;
}

export interface IUserSrv {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}
export interface IUserInfoSrv extends IUserSrv {
  isAdmin: boolean;
}

export interface ICreateUserSrv {
  email: string;
  username: string;
  password: string;
}
