// swaggerHandler.js
import { serve, setup as _setup } from "swagger-ui-express";
import swaggerOutput from "../middleware/swagger-output.json" assert { type: "json" };
import FileHandler from "./fileHandler.js";
import schemaHandler from "./schemaHandler.js";

class SwaggerHandler {
  constructor() {}
  setup(app) {
    app.use("/api-docs", serve, _setup(swaggerOutput));
    // this.updateSwaggerDoc();
  }
  async updateSwaggerDoc() {
    let schemaArray = await schemaHandler.loadSchemas();
    const fileHandler = new FileHandler(
      "src/app/middleware/swagger-output.json"
    );
    let swaggerOutputFile = await fileHandler.readFile();
    swaggerOutputFile = JSON.parse(swaggerOutputFile);
    if (Object.keys(swaggerOutputFile).length != 0) {
      let paths = Array.from(
        new Set(
          Object.keys(swaggerOutputFile.paths).map((path) => {
            path = path.split("/");
            path = `/${path[1]}/${path[2]}`;
            return path;
          })
        )
      );
      for (const path of paths) {
        let regexPattern = new RegExp(path, "i");
        const matchingKeys = Object.keys(swaggerOutputFile.paths).filter(
          (key) => regexPattern.test(key)
        );
        for (const key of matchingKeys) {
          let requestType = Object.keys(swaggerOutputFile.paths[key])[0];
          swaggerOutputFile.paths[key][requestType].tags = [path];
          for (const schema of schemaArray) {
            if (regexPattern.test(schema.model) && requestType == "post") {
              let schemaObj = JSON.parse(JSON.stringify(schema));
              delete schemaObj.model;
              schemaObj = Object.keys(schemaObj);
              schemaObj = schemaObj.reduce((acc, key) => {
                acc[key] = {
                  example: "any",
                };
                return acc;
              }, {});
              swaggerOutputFile.paths[key][
                requestType
              ].parameters[0].schema.properties = schemaObj;
            }
          }
        }
      }
      // Reading the file
      if (fileHandler.fileExists()) {
        await fileHandler.writeFile(JSON.stringify(swaggerOutputFile));
      }
    }
  }
}

export default new SwaggerHandler();
