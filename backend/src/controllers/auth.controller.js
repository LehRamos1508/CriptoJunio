import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function login(req, res, next) {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    return res.status(200).json({ message: "Login bem-sucedido", userId: user.id });
  } catch (err) {
    next(err);
  }
}
