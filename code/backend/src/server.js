import express from "express";
import env from "dotenv";
import logger from "morgan";
import cors from "cors";
import mongooseCon from "./configuration/mongoose.js";
import { CONSTANTS, DIR } from "./configuration/config.js";
import apiRouter from "./app/routes.js";
import configExpressJwt from "./configuration/expressJwt.js";
import bodyParser from "body-parser";
import customResponse from "./app/helpers/customResponse.js";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { insertSuperAdmin } from "./app/helpers/utility.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
env.config();
const app = express();
app.use(cors("*"));
mongooseCon(app);
app.use(logger("dev"));
app.use("/v1", configExpressJwt());
app.use(bodyParser.json());
app.use(customResponse);
app.use("/assets", express.static(join(__dirname, "assets")));
insertSuperAdmin();

//Route Prefixes
app.use("/", apiRouter);

app.set("port", CONSTANTS.port || 5000);

app.listen(app.get("port"), () => {
  console.log(`Server Running on PORT ${app.get("port")}`);
});
DIR.forEach((x) => {
  if (!fs.existsSync(x)) {
    fs.mkdirSync(x, { recursive: true });
  }
});
export default app;
