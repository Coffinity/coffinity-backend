import { Document, Types } from "mongoose";

export interface ICreateOrderDTO {
  items: {
    productId: string;
    quantity: number;
  }[];
  address: IAddress;
}
export interface IAddress {
  fullname: string;
  address_line: string;
  province: string;
  district: string;
  postcode: string;
  phone_number: string;
}

export interface IOrderDTO {
  userId: string;
  items: {
    name: string;
    description: string;
    image: string;
    type: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: string;
}

export interface ICheckoutSuccessResponse {
  message: string;
  session_id: string;
}
interface Item {
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  _id: string;
}

interface CheckoutResult {
  userId: string;
  items: Item[];
  address: IAddress;
  order_id: string;
  total: number;
  status: string;
  session_id: string;
  _id: string;
  __v: number;
}

// export const toOrderDTO = (
//   order: Document<
//     unknown,
//     {},
//     {
//       items: {
//         type: string;
//         name: string;
//         description: string;
//         image: string;
//         price: number;
//         quantity: number;
//       }[];
//       status: string;
//       total?: number | null | undefined;
//       userId?: Types.ObjectId | null | undefined;
//     }
//   >
// ) => {
//     const {} = order
// };
