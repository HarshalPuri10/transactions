import express from "express";

const router = express.Router();

import authRouter from "./auth/index.js";
import salesRouter from "./sales/index.js";

router.use("/auth", authRouter);
router.use("/sales", salesRouter);

export default router;
