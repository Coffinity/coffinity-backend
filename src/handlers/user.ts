import { IUserDTO, toUserDTO } from "../dto/user";

import "dotenv/config";
import { IUserHandler } from "./interface";
import { IUserService } from "../services/interface";
import { ICreateUserSrv } from "../services/types";

export default class UserHandler implements IUserHandler {
  private userSrv: IUserService;
  constructor(userSrv: IUserService) {
    this.userSrv = userSrv;
  }

  registrationHandler: IUserHandler["registrationHandler"] = async (
    req,
    res
  ) => {
    const { username, email, password } = req.body;
    const newUser: ICreateUserSrv = { username, email, password };
    try {
      const result = await this.userSrv.createUser(newUser);
      const userResponse: IUserDTO = toUserDTO(result);
      return res.status(201).json(userResponse).end();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message }).end();
      }
      return res.status(500).json({ message: "internal server error" }).end();
    }
  };

  loginHandler: IUserHandler["loginHandler"] = async (req, res) => {
    try {
      const { username, password: inputPassword } = req.body;

      const accessToken = await this.userSrv.login(username, inputPassword);

      return res.status(201).json({ accessToken: accessToken }).end();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "internal server error" });
    }
  };

  getUserInfoHandler: IUserHandler["getUserInfoHandler"] = async (req, res) => {
    const userId = res.locals.user.id;
    try {
      const user = await this.userSrv.findById(userId);
      const uerResponse: IUserDTO = toUserDTO(user);
      return res.status(200).json(uerResponse).end();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "internal server error" });
    }
  };
}

// export const updateCartHandler: RequestHandler<
//   undefined,
//   { message: string },
//   IAddItemToCartDTO,
//   {},
//   AuthStatus
// > = async (req, res) => {
//   try {
//     const userId = res.locals.user.id;

//     const { productId, quantity } = req.body;
//     const product = await getProductById(productId);
//     if (!product) {
//       throw new Error("product not found !");
//     }
//     const result = await updateCart(userId, productId, quantity);
//     console.log(result);

//     return res.status(200).json({ message: "success" });
//   } catch (err) {
//     if (err instanceof Error) {
//       return res.status(400).json({ message: err.message });
//     }
//     return res.status(500).json({ message: "internal server error" });
//   }
// };

// export const getCartHandler: RequestHandler<
//   undefined,
//   { message: string },
//   {},
//   {},
//   AuthStatus
// > = async (req, res) => {
//   try {
//     const userId = res.locals.user.id;
//     const result = await getUserCart(userId);
//     console.log(result);

//     return res.status(409).json(result?.toJSON());
//   } catch (err) {
//     if (err instanceof Error) {
//       return res.status(400).json({ message: err.message });
//     }
//     return res.status(500).json({ message: "internal server error" });
//   }
// };
