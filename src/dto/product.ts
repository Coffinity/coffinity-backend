import { Document, Types } from "mongoose";
import { ProductDocument } from "../interfaces/product";

export interface ICreateProductDTO {
  name: string;
  description: string;
  image: string;
  type: string;
  price: number;
  stockQuantity: number;
}

export interface IUpdateProductDTO {
  name: string;
  description: string;
  image: string;
  type: string;
  price: number;
  stockQuantity: number;
}
export interface IProductDTO {
  id: string;
  name: string;
  image: string;
  description: string;
  type: string;
  price: number;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export const toProductDTO = (
  product: Document<unknown, {}, ProductDocument> &
    ProductDocument & {
      _id: Types.ObjectId;
    }
) => {
  const {
    _id,
    name,
    description,
    image,
    type,
    price,
    stockQuantity,
    createdAt,
    updatedAt,
  } = product;
  const productDTO: IProductDTO = {
    id: _id.toString(),
    name,
    description,
    image,
    type,
    price,
    stockQuantity,
    createdAt,
    updatedAt,
  };
  return productDTO;
};
