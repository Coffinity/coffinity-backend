import { Document } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface UserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): boolean;
}
