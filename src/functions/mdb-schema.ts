import { engine } from "./spawn/engine";
import { launchCommand } from "./spawn/launchCommand";

import path = require("node:path");

const schema = async (
  data: { database: string; windowsPath?: string } = {
    database: "",
    windowsPath: "",
  }
): Promise<string> => {
  const { database, windowsPath } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-schema",
  });
  const pathDatabase = path.resolve(database);
  const result = await launchCommand({
    command,
    args: [pathDatabase],
  });

  return result;
};

const schemaTable = async (
  data: { database: string; windowsPath?: string; table: string } = {
    database: "",
    windowsPath: "",
    table: "",
  }
): Promise<string> => {
  const { database, windowsPath, table } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-schema",
  });
  const pathDatabase = path.resolve(database);
  const result = await launchCommand({
    command,
    args: [pathDatabase, `-T"${table}"`],
  });

  return result;
};

export { schema, schemaTable };
