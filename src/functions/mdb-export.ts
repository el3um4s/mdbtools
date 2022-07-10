import { engine } from "./spawn/engine";
import { launchCommand } from "./spawn/launchCommand";
import { printCommand } from "./spawn/printCommand";

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

const tableToCSVFile = async (
  data: {
    database: string;
    windowsPath?: string;
    table: string;
    file: string;
    options?: string;
  } = {
    database: "",
    windowsPath: "",
    table: "",
    file: "",
    options: "",
  }
): Promise<boolean> => {
  const { database, windowsPath, table, file } = data;

  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-export",
  });

  const opts = data?.options ? data?.options : "-Q";

  const pathDatabase = path.resolve(database);
  const pathToFile = path.resolve(file);
  const result = await printCommand({
    command,
    args: [pathDatabase, `"${table}"`, opts],
    file: pathToFile,
  });

  return result;
};

export { tableToCSV, tableToCSVFile };
