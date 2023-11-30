import ProductModel from "../models/product";
import { IProductRepository } from "./interface";
import { ICreateProduct, IUpdateProduct } from "./types";

export default class ProductRepository implements IProductRepository {
  createProduct: IProductRepository["createProduct"] = async (
    newProduct: ICreateProduct
  ) => {
    try {
      const product = await ProductModel.create(newProduct);
      return product;
    } catch (error) {
      throw error;
    }
  };
  getAllProducts: IProductRepository["getAllProducts"] = async () => {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      throw error;
    }
  };
  getProductById: IProductRepository["getProductById"] = async (id: string) => {
    try {
      const product = await ProductModel.findById(id);
      if (!product) {
        throw new Error("product not found");
      }
      return product;
    } catch (error) {
      throw error;
    }
  };
  updateProduct: IProductRepository["updateProduct"] = async (
    productId: string,
    product: IUpdateProduct
  ) => {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        product
      );
      if (!updatedProduct) {
        throw new Error("can not update product");
      }
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  };
  deleteProduct: IProductRepository["deleteProduct"] = async (id: string) => {
    try {
      const result = await ProductModel.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        throw new Error("can not delete product");
      }
      return true;
    } catch (error) {
      throw error;
    }
  };
}
