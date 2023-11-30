import { toProductDTO } from "../dto/product";

import { IProductHandler } from "./interface";
import { IProductService } from "../services/interface";
import { ICreateProductSrv } from "../services/types";

export default class ProductHandler implements IProductHandler {
  private productSrv: IProductService;
  constructor(productSrv: IProductService) {
    this.productSrv = productSrv;
  }

  createProductHandler: IProductHandler["createProductHandler"] = async (
    req,
    res
  ) => {
    const { name, description, image, price, stockQuantity, type } = req.body;
    const newProduct: ICreateProductSrv = {
      name,
      description,
      image,
      price,
      stockQuantity,
      type,
    };
    try {
      const product = await this.productSrv.createProduct(newProduct);
      const productResponse = toProductDTO(product);
      return res.status(201).json(productResponse).end();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "internal server error" });
    }
  };

  getAllProductsHandler: IProductHandler["getAllProductsHandler"] = async (
    req,
    res
  ) => {
    try {
      const products = await this.productSrv.getAllProducts();
      const productsResponse = products.map((product) => {
        return toProductDTO(product);
      });

      return res.status(200).json(productsResponse).end();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "internal server error" });
    }
  };

  getProductHandler: IProductHandler["getProductHandler"] = async (
    req,
    res
  ) => {
    const id = req.params.id;
    try {
      const product = await this.productSrv.getProductById(id);
      const productResponse = toProductDTO(product);
      return res.status(200).json(productResponse).end();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "internal server error" });
    }
  };

  deleteProductHandler: IProductHandler["deleteProductHandler"] = async (
    req,
    res
  ) => {
    const id = req.params.id;
    const isAdmin = res.locals.user.isAdmin;
    if (isAdmin) {
      try {
        const isOk = await this.productSrv.deleteProduct(id);
        if (!isOk) {
          throw new Error("can not delete product");
        }
        return res.status(200).json({ message: "success" }).end();
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "internal server error" });
      }
    }
    return res.status(403).json({ message: "Forbidden" }).end();
  };
}
