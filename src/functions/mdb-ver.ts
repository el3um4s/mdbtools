import { engine } from "./engine";
import { launchCommand } from "./launchCommand";

import path = require("node:path");

const versionMdbTools = async (windowsPath = ""): Promise<string> => {
  const command = engine({ windowsPath, command: "mdb-ver" });
  const result = await launchCommand({ command, args: ["-M"] });
  return result.trim();
};

const version = async (
  data: { database: string; windowsPath: string } = {
    database: "",
    windowsPath: "",
  }
): Promise<string> => {
  const { database, windowsPath } = data;
  const command = engine({ windowsPath, command: "mdb-ver" });
  const pathDatabase = path.resolve(database);
  const result = await launchCommand({ command, args: [pathDatabase] });
  return result.trim();
};

export { versionMdbTools, version };
