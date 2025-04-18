import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to dynamically import all files from a directory
function importAll(directory: string): Record<string, any> {
  const dirPath = path.join(__dirname, directory);
  const exports: Record<string, any> = {};

  fs.readdirSync(dirPath).forEach((file: string) => {
    if (file.endsWith(".ts") || file.endsWith(".js")) {
      const moduleName = path.basename(file, path.extname(file)); // Remove extension
      exports[moduleName] = require(path.join(dirPath, file));
    }
  });

  return exports;
}

// Dynamically load services and types
export const services = importAll("services");
export const types = importAll("types");