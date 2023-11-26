import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserDocument } from "../interfaces/user";

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;
  const salt = bcrypt.genSaltSync(Number(process.env.SALT as string));
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = function (
  candidatePassword: string
): boolean {
  const user = this as UserDocument;

  return bcrypt.compareSync(candidatePassword, user.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
