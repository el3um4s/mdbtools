import { engine } from "./engine";
import { launchCommand } from "./launchCommand";

import path = require("node:path");

const tableToCSV = async (
  data: {
    database: string;
    windowsPath?: string;
    table: string;
  } = {
    database: "",
    windowsPath: "",
    table: "",
  }
): Promise<string> => {
  const { database, windowsPath, table } = data;

  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-export",
  });

  const pathDatabase = path.resolve(database);
  const result = await launchCommand({
    command,
    args: [pathDatabase, table],
  });

  return result.replace(/(\r\n|\n|\r)/gm, "\n").trim();
};

export { tableToCSV };
