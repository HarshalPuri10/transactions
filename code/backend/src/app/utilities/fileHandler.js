// FileHandler.mjs
import fs from "fs/promises";

class FileHandler {
  constructor(filename) {
    this.filename = filename;
  }

  async fileExists() {
    try {
      await fs.access(this.filename);
      return true;
    } catch {
      return false;
    }
  }
  async readFile() {
    try {
      const data = await fs.readFile(this.filename, "utf8");
      return data;
    } catch (err) {
      console.error(`Error reading file: ${err}`);
      throw err;
    }
  }

  async readDir(dirPath, options) {
    try {
      const files = await fs.readdir(dirPath, options);
      return files;
    } catch (err) {
      console.error(`Error reading directory: ${err}`);
      throw err;
    }
  }

  async writeFile(content) {
    try {
      await fs.writeFile(this.filename, content);
      console.log("File has been written");
    } catch (err) {
      console.error(`Error writing file: ${err}`);
      throw err;
    }
  }

  async appendFile(content) {
    try {
      await fs.appendFile(this.filename, content);
      console.log("Content has been appended");
    } catch (err) {
      console.error(`Error appending to file: ${err}`);
      throw err;
    }
  }

  async deleteFile() {
    try {
      await fs.unlink(this.filename);
      console.log("File has been deleted");
    } catch (err) {
      console.error(`Error deleting file: ${err}`);
      throw err;
    }
  }
}

export default FileHandler;
