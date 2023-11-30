import UserModel from "../models/user";
import { IUserRepository } from "./interface";
import { ICreateUser } from "./types";

export default class UserRepository implements IUserRepository {
  createUser: IUserRepository["createUser"] = async (user: ICreateUser) => {
    try {
      const result = await UserModel.create(user);

      return result;
    } catch (error) {
      throw error;
    }
  };
  findById: IUserRepository["findById"] = async (id: string) => {
    try {
      const user = await UserModel.findById({ _id: id });
      if (!user) {
        throw new Error("user not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  };

  findByUsername: IUserRepository["findByUsername"] = async (
    username: string
  ) => {
    try {
      const user = await UserModel.findOne({ username: username });
      if (!user) {
        throw new Error("user not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  };
}
