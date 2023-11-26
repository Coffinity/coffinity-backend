import { Document, Types } from "mongoose";

export interface ICreateOrderDTO {
  items: {
    productId: string;
    quantity: number;
  }[];
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
