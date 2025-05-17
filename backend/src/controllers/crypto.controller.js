import crypto from "crypto";
import {prisma} from "../database/index.js";

function caesarCipher(text, step, decrypt = false) {
  const s = decrypt ? -step : step;
  return text.replace(/[a-z]/gi, (char) => {
    const base = char === char.toUpperCase() ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + s + 26) % 26) + base);
  });
}

export async function encryptMessage(req, res, next) {
  const { message, step } = req.body;

  if (!message || step === undefined) {
    return res.status(400).json({ success: false, error: "Mensagem e passo são obrigatórios" });
  }

  const encrypted = caesarCipher(message, step);
  const hash = crypto.randomUUID();

  try {
    await prisma.hashAccess.create({
      data: {
        hash,
        step: Number(step),
      },
    });

    return res.status(200).json({ success: true, encrypted, hash });
  } catch (err) {
    next(err);
  }
}

export async function decryptMessage(req, res, next) {
  const { message, hash } = req.body;

  if (!message || !hash) {
    return res.status(400).json({ success: false, error: "Mensagem e hash são obrigatórios" });
  }

  try {
    const record = await prisma.hashAccess.findUnique({ where: { hash } });

    if (!record) return res.status(404).json({ success: false, error: "Hash não encontrado" });
    if (record.used) return res.status(403).json({ success: false, error: "Hash já foi usado" });

    const decrypted = caesarCipher(message, record.step, true);

    await prisma.hashAccess.update({
      where: { hash },
      data: { used: true },
    });

    return res.status(200).json({ success: true, decrypted });
  } catch (err) {
    next(err);
  }
}
