import { RequestHandler } from "express";
import {
  ICreateProductDTO,
  IProductDTO,
  IUpdateProductDTO,
  toProductDTO,
} from "../dto/product";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../services/product";
import cloudinary from "../utils/cloudinary";
import { AuthStatus } from "../middleware/jwt";

export const createProductHandler: RequestHandler<
  undefined,
  IProductDTO | { message: string },
  ICreateProductDTO
> = async (req, res) => {
  const { name, description, image, price, stockQuantity, type } = req.body;
  try {
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "coffinity",
      });
      if (uploadResponse) {
        const product = await createProduct({
          name,
          description,
          image: uploadResponse.url,
          type,
          price,
          stockQuantity,
        });

        const productsResponse = toProductDTO(product);

        return res.status(201).json(productsResponse).end();
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "internal server error" });
  }
};

export const getAllProductsHandler: RequestHandler<
  undefined,
  IProductDTO[] | { message: string }
> = async (req, res) => {
  try {
    const products = await getAllProducts();
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

export const getProductHandler: RequestHandler<
  { id: string },
  IProductDTO | { message: string }
> = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await getProductById(id);
    if (!product) {
      throw new Error("not found");
    }
    const productResponse = toProductDTO(product);
    return res.status(200).json(productResponse).end();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "internal server error" });
  }
};

export const deleteProductHandler: RequestHandler<
  { id: string },
  { message: string },
  undefined,
  {},
  AuthStatus
> = async (req, res) => {
  const id = req.params.id;
  const isAdmin = res.locals.user.isAdmin;
  console.log(isAdmin);

  if (isAdmin) {
    try {
      await deleteProduct(id);
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
