import { IProductRepository } from "../repositories/interface";
import cloudinary from "../utils/cloudinary";
import { IProductService } from "./interface";
import { ICreateProductSrv, IProductSrv } from "./types";

export default class ProductService implements IProductService {
  private productRepo: IProductRepository;
  constructor(productRepo: IProductRepository) {
    this.productRepo = productRepo;
  }

  createProduct: IProductService["createProduct"] = async (newProduct) => {
    try {
      const uploadResponse = await cloudinary.uploader.upload(
        newProduct.image,
        {
          upload_preset: "coffinity",
        }
      );

      if (!uploadResponse) {
        throw new Error("can not upload image");
      }
      const productWithImageUploaded: ICreateProductSrv = {
        name: newProduct.name,
        image: uploadResponse.url,
        description: newProduct.description,
        price: newProduct.price,
        type: newProduct.type,
        stockQuantity: newProduct.stockQuantity,
      };
      const product = await this.productRepo.createProduct(
        productWithImageUploaded
      );

      const result: IProductSrv = {
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
      return result;
    } catch (error) {
      throw error;
    }
  };

  getAllProducts: IProductService["getAllProducts"] = async () => {
    try {
      const products = await this.productRepo.getAllProducts();
      const result: IProductSrv[] = products.map((product) => {
        return {
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
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  getProductById: IProductService["getProductById"] = async (id) => {
    try {
      const product = await this.productRepo.getProductById(id);
      const result: IProductSrv = {
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
      return result;
    } catch (error) {
      throw error;
    }
  };
  updateProduct: IProductService["updateProduct"] = async (
    productId,
    product
  ) => {
    try {
      const updatedProduct = await this.productRepo.updateProduct(
        productId,
        product
      );
      const result: IProductSrv = {
        id: updatedProduct.id,
        name: updatedProduct.name,
        description: updatedProduct.description,
        type: updatedProduct.type,
        image: updatedProduct.image,
        price: updatedProduct.price,
        stockQuantity: updatedProduct.stockQuantity,
        createdAt: updatedProduct.createdAt,
        updatedAt: updatedProduct.updatedAt,
      };
      return result;
    } catch (error) {
      throw error;
    }
  };

  deleteProduct: IProductService["deleteProduct"] = async (productId) => {
    try {
      const result = await this.productRepo.deleteProduct(productId);
      return result;
    } catch (error) {
      throw error;
    }
  };
}
