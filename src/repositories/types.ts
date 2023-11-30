export interface ICreateProduct {
  name: string;
  description: string;
  image: string;
  type: string;
  price: number;
  stockQuantity: number;
}

export interface IUpdateProduct {
  name: string;
  description: string;
  image: string;
  type: string;
  price: number;
  stockQuantity: number;
}
export interface ICreateUser {
  email: string;
  username: string;
  password: string;
}

export interface ICreateOrder {
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

export interface IAddress {
  fullName: string;
  address_line: string;
  province: string;
  district: string;
  postcode: string;
  phone_number: string;
}
