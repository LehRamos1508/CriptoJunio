import jwt from "jsonwebtoken";
import { prisma } from "../database/index.js";

const secretKey = process.env.JWT_SECRET;

const { verify } = jwt

export async function ensureAuthenticate(req, res, next) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).json({ success: false, message: "Token inválido" });
    }

    const [isBearer, token] = authToken.split(" ");

    if (isBearer !== "Bearer") {
      return res.status(401).json({ success: false, message: "Token inválido" });
    }

    const { id } = verify(token, secretKey);

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(401).json({ success: false, message: "Usuário não autorizado" });
    }

    req.user = {
      id: user.id,
      userName: user.username,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Token inválido" });
  }
}
