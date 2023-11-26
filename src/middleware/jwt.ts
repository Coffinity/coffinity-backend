import { RequestHandler } from "express";
import { JsonWebTokenError, JwtPayload, verify } from "jsonwebtoken";
import "dotenv/config";

export interface AuthStatus {
  user: {
    id: string;
    isAdmin: boolean;
  };
}

export default class JWTMiddleware {
  auth: RequestHandler<unknown, unknown, unknown, unknown, AuthStatus> = async (
    req,
    res,
    next
  ) => {
    try {
      const token = req.header("Authorization")!.replace("Bearer ", "").trim();

      const { userId, exp, isAdmin } = verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      if (!exp) {
        return res.status(401).send("token expired").end();
      }
      res.locals = {
        user: {
          id: userId,
          isAdmin,
        },
      };

      return next();
    } catch (error) {
      console.error(error);

      if (error instanceof TypeError) {
        return res.status(401).send("Authorization is expected").end();
      }
      if (error instanceof JsonWebTokenError) {
        return res.status(401).send("Forbidden: token is invalid").end();
      }
      if (error instanceof Error) {
        return res.status(401).send("Forbidden: token is invalid").end();
      }

      return res.status(500).send("internal server error");
    }
  };
}
