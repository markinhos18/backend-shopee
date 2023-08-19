import jwt from "jsonwebtoken";
import { UserService } from "../services/user-service.js";

export const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  // console.log(authorization);

  // exemple "Bearer", fdgfdjgdksfgsfg
  const token = authorization ? authorization.split(" ")[1] : undefined;
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Sem autorizado, faça o login" });
  }

  const secretKey = process.env.SECRET_KEY;
  jwt.verify(
    token,
    secretKey,
    { ignoreExpiration: false },
    async (err, decodedToken) => {
      // console.log("teste1");
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ message: "Aconteceu um erro ao logar no sistema 123" });
      }
      // console.log("teste2");
      const isValidToken = decodedToken && decodedToken.user;
      if (!isValidToken) {
        return res
          .status(401)
          .json({ message: "Aconteceu um erro ao logar no sistema" });
      }

      const userService = new UserService();
      const user = await userService.findByEmail(decodedToken.user.email);
      if (user) {
        return next();
      }
    }
  );
};
