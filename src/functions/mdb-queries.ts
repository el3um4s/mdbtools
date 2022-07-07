import { engine } from "./engine";
import { launchCommand } from "./launchCommand";

import path = require("node:path");

const queries = async (
  data: { database: string; windowsPath?: string } = {
    database: "",
    windowsPath: "",
  }
): Promise<string[]> => {
  const { database, windowsPath } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-queries",
  });
  const pathDatabase = path.resolve(database);
  const result = await launchCommand({
    command,
    args: [pathDatabase, "-d;"],
  });

  const listQueries = result.split(";").filter((x) => x.trim() !== "");
  return listQueries;
};

const queriesSQL = async (
  data: { database: string; windowsPath?: string; query: string } = {
    database: "",
    windowsPath: "",
    query: "",
  }
): Promise<string> => {
  const { database, windowsPath, query } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-queries",
  });
  const pathDatabase = path.resolve(database);
  const result = await launchCommand({
    command,
    args: [pathDatabase, query],
  });

  return result;
};

export { queries, queriesSQL };
