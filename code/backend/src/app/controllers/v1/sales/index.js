import express from "express";

const router = express.Router();

import transaction from "./transaction/routes.js";

router.use("/transaction", transaction);

export default router;
