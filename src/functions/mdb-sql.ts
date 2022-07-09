import { engine } from "./spawn/engine";
import { launchCommand } from "./spawn/launchCommand";

import { CSVToJSON } from "./utilities/CSVToJSON";

import path = require("node:path");

const sqlAsString = async (
  data: { database: string; windowsPath?: string; sql: string } = {
    database: "",
    windowsPath: "",
    sql: "",
  }
): Promise<string> => {
  const { database, windowsPath, sql } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-sql",
  });
  const pathDatabase = path.resolve(database);
  const result = await launchCommand({
    command,
    args: [pathDatabase, "-F", "-P"],
    input: sql,
  });

  return result.trim();
};

const sql = async (
  data: { database: string; windowsPath?: string; sql: string } = {
    database: "",
    windowsPath: "",
    sql: "",
  }
): Promise<Record<string, unknown>[]> => {
  const result = await sqlAsString(data);

  const list = CSVToJSON(result, "\t");
  return list;
};

export { sql, sqlAsString };
