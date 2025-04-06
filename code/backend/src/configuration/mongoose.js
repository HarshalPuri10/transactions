import mongoose from "mongoose";
import { CONSTANTS } from "./config.js";

// Replace '<your_database_url>' with your actual MongoDB URL
const databaseUrl = CONSTANTS.devDataBaseUrl;
function mongooseCon(app) {
  mongoose.connect(databaseUrl);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB!");
    // You can start performing operations on your database here
  });
  if (app) {
    app.set("mongoose", mongoose);
  }
}

export default mongooseCon;
