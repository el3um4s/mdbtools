import { engine } from "./spawn/engine";
import { launchCommand } from "./spawn/launchCommand";

import path = require("node:path");

const count = async (
  data: { database: string; windowsPath?: string; table: string } = {
    database: "",
    windowsPath: "",
    table: "",
  }
): Promise<number> => {
  const { database, windowsPath, table } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-count",
  });
  const pathDatabase = path.resolve(database);
  const result = await launchCommand({
    command,
    args: [pathDatabase, table],
  });

  return parseInt(result.trim());
};

export { count };
