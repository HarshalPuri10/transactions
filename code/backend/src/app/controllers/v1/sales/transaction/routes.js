import express from "express";
const app = express();
import TransactionController from "./transaction.js";

app.post("/create", TransactionController.create);
app.get("/getAll", TransactionController.getAll);
app.get("/getDashboard", TransactionController.getDashboard);
app.get("/getById/:id", TransactionController.getById);
app.put("/update/:id", TransactionController.update);
app.delete("/delete/:id", TransactionController.deleteById);

export default app;
