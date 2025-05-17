import express from "express";
import {
  encryptMessage,
  decryptMessage,
} from "../controllers/crypto.controller.js";
import { ensureAuthenticate } from "../Middlewares/authorization.js";

const router = express.Router();

router.post("/encrypt", ensureAuthenticate, encryptMessage);
router.post("/decrypt", ensureAuthenticate, decryptMessage);

export default router;
