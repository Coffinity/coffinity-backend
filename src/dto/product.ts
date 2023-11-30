import { IProductSrv } from "../services/types";

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

export const toProductDTO = (product: IProductSrv): IProductDTO => {
  const productDTO: IProductDTO = {
    id: product.id,
    name: product.name,
    description: product.description,
    type: product.type,
    image: product.image,
    price: product.price,
    stockQuantity: product.stockQuantity,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };

  return productDTO;
};
