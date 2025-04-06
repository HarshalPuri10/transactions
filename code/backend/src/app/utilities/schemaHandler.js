import path from "path";
import { pathToFileURL } from "url";
import FileHandler from "./fileHandler.js";
class SchemaLoader {
  constructor(schemasPath) {
    this.schemasPath = schemasPath;
    this.schemasMap = [];
  }

  async loadSchemas(dirPath = this.schemasPath) {
    let files = new FileHandler(dirPath);
    const entries = await files.readDir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "repository") {
          await this.loadSchemas(entryPath);
        }
      } else if (
        entry.isFile() &&
        entry.name.endsWith(".js") &&
        entry.name !== "index.js"
      ) {
        const schemaModule = await import(pathToFileURL(entryPath).href);
        const { modelName, schema } = schemaModule.default;
        this.schemasMap.push({ model: modelName, ...schema.obj });
      }
    }
    return this.schemasMap;
  }
}
export default new SchemaLoader("src/app/models");
