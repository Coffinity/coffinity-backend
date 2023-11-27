import {
  ICreateProductDTO,
  IProductDTO,
  IUpdateProductDTO,
} from "../dto/product";
import ProductModel from "../models/product";

export async function createProduct(input: ICreateProductDTO) {
  try {
    const product = await ProductModel.create(input);
    return product;
  } catch (err) {
    throw err;
  }
}

export async function getAllProducts() {
  try {
    const products = await ProductModel.find();
    return products;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(id: string) {
  try {
    const product = await ProductModel.findById(id);

    return product;
  } catch (error) {
    throw error;
  }
}
export async function updateProduct(
  productId: string,
  product: IUpdateProductDTO
) {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      product
    );
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(productId: string) {
  try {
    await ProductModel.deleteOne({ _id: productId });
  } catch (error) {
    throw error;
  }
}
