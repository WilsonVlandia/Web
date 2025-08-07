import * as fs from "fs";

export default class JsonManager {
  public static appendToJsonArrayFile<T>(filePath: string, newItem: T): boolean {
    try {
      let dataArray: T[] = [];

      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8").trim();
        if (fileContent) {
          dataArray = JSON.parse(fileContent);
          if (!Array.isArray(dataArray)) return false;
        }
      }

      dataArray.push(newItem);
      const json = JSON.stringify(dataArray, null, 2); 
      fs.writeFileSync(filePath, json, "utf-8");

      return true;
    } catch (error) {
      return false;
    }
  }
}
