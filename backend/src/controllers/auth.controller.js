import jwt from "jsonwebtoken";
import {prisma} from "../database/index.js";

export async function login(req, res, next) {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, error: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ success: true, message: "Login bem-sucedido", token });
  } catch (err) {
    next(err);
  }
}
