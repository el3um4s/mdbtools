import { engine } from "./spawn/engine";
import { launchCommand } from "./spawn/launchCommand";

import path = require("node:path");

const tableToJson = async (
  data: {
    database: string;
    windowsPath?: string;
    table: string;
  } = {
    database: "",
    windowsPath: "",
    table: "",
  }
): Promise<Record<string, unknown>[]> => {
  const { database, windowsPath, table } = data;

  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-json",
  });

  const pathDatabase = path.resolve(database);
  const result = await launchCommand({
    command,
    args: [pathDatabase, table],
  });

  const list = result
    .replace(/(\r\n|\n|\r)/gm, "\n")
    .trim()
    .split("\n")
    .filter((x) => x.trim() !== "")
    .map((x) => JSON.parse(x));

  return list;
};

export { tableToJson };
