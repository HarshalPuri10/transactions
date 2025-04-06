import express from "express";
const app = express();
import { create, login, getAll, getById, update, deleteById } from "./user.js";

app.post("/register", create);
app.post("/login", login);
app.get("/getAll", getAll);
app.get("/profile/:id", getById);
app.put("/update/:id", update);
app.delete("/delete/:id", deleteById);

export default app;
