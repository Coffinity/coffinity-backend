interface IProduct {
  name: string;
  description: string;
  image: string;
  type: string;
  price: number;
  stockQuantity: number;
}

export interface ProductDocument extends IProduct, Document {
  createdAt: Date;
  updatedAt: Date;
}
