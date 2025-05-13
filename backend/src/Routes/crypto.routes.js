import express from "express";
import {
  encryptMessage,
  decryptMessage,
} from "../controllers/crypto.controller.js";

const router = express.Router();

router.post("/encrypt", encryptMessage);
router.post("/decrypt", decryptMessage);

export default router;
