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
