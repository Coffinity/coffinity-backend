import { sign } from "jsonwebtoken";
import { IUserRepository } from "../repositories/interface";
import { IUserService } from "./interface";
import { ICreateUserSrv, IUserSrv } from "./types";

export default class UserService implements IUserService {
  private userRepo: IUserRepository;
  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }
  createUser: IUserService["createUser"] = async (newUser: ICreateUserSrv) => {
    try {
      const user = await this.userRepo.createUser(newUser);
      const result: IUserSrv = {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      };
      return result;
    } catch (error) {
      throw error;
    }
  };
  login: IUserService["login"] = async (
    username: string,
    inputPassword: string
  ) => {
    try {
      const user = await this.userRepo.findByUsername(username);
      const userId: string = user.id;
      const isAdmin: boolean = user.isAdmin;

      const isOk = user.comparePassword(inputPassword);
      if (!isOk) {
        throw new Error("wrong username or password");
      }
      const accessToken = sign(
        { userId, isAdmin },
        process.env.JWT_SECRET as string,
        {
          algorithm: "HS512",
          expiresIn: "12h",
          issuer: "DHAMAJATI",
          subject: "user-credential",
        }
      );
      return accessToken;
    } catch (error) {
      throw error;
    }
  };
  findById: IUserService["findById"] = async (id: string) => {
    try {
      const user = await this.userRepo.findById(id);
      const result: IUserSrv = {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      };
      return result;
    } catch (error) {
      throw error;
    }
  };
}
