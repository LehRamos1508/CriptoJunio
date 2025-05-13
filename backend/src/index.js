// 📁 backend/src/index.js
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth.routes.js";
import cryptoRoutes from "./routes/crypto.routes.js";
import { logger } from "./Middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(logger); // middleware de log

app.use("/auth", authRoutes);
app.use("/crypto", cryptoRoutes);

app.use(errorHandler); // middleware de erro (padrão global)

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
