import { IUserSrv } from "../services/types";

export interface IUserDTO {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

export interface ICreateUserDTO {
  email: string;
  username: string;
  password: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IAccessToken {
  accessToken: string;
}

export const toUserDTO = (user: IUserSrv): IUserDTO => {
  const userDTO: IUserDTO = {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  };
  return userDTO;
};
