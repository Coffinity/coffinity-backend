import { RequestHandler } from "express";
import { IAccessToken, ICreateUserDTO, ILogin, IUserDTO } from "../dto/user";
import { AuthStatus } from "../middleware/jwt";
import { ICreateProductDTO, IProductDTO } from "../dto/product";
import { ICheckoutSuccessResponse, ICreateOrderDTO } from "../dto/order";

export interface IUserHandler {
  registrationHandler: RequestHandler<IEmpty, IUserDTO | IMsg, ICreateUserDTO>;

  loginHandler: RequestHandler<{}, IAccessToken | IMsg, ILogin>;
  getUserInfoHandler: RequestHandler<
    IEmpty,
    IUserDTO | IMsg,
    IEmpty,
    IEmpty,
    AuthStatus
  >;
}
export interface Id {
  id: string;
}
export interface IEmpty {}
export interface IMsg {
  message: string;
}

export interface IProductHandler {
  createProductHandler: RequestHandler<
    IEmpty,
    IProductDTO | IMsg,
    ICreateProductDTO,
    IEmpty,
    AuthStatus
  >;
  getAllProductsHandler: RequestHandler<IEmpty, IProductDTO[] | IMsg>;
  getProductHandler: RequestHandler<Id, IProductDTO | IMsg>;
  deleteProductHandler: RequestHandler<Id, IMsg, undefined, IEmpty, AuthStatus>;
}

export interface IOrderHandler {
  checkoutHandler: RequestHandler<
    IEmpty,
    ICheckoutSuccessResponse | IMsg,
    ICreateOrderDTO,
    IEmpty,
    AuthStatus
  >;

  getCheckoutInfoHandler: RequestHandler<
    Id,
    IEmpty,
    IEmpty,
    IEmpty,
    AuthStatus
  >;
  webhookHandler: RequestHandler<IEmpty, string, string | Buffer, IEmpty>;
}
