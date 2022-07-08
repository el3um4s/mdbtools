import { engine } from "./spawn/engine";
import { launchCommand } from "./spawn/launchCommand";
import { printCommand } from "./spawn/printCommand";

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
    args: [pathDatabase, `--table=${table}`],
  });

  return result;
};

const schemaToFile = async (
  data: { database: string; windowsPath?: string; file: string } = {
    database: "",
    windowsPath: "",
    file: "",
  }
): Promise<boolean> => {
  const { database, windowsPath, file } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-schema",
  });
  const pathDatabase = path.resolve(database);
  const pathToFile = path.resolve(file);
  const result = await printCommand({
    command,
    args: [pathDatabase],
    file: pathToFile,
  });

  return result;
};

const schemaTableToFile = async (
  data: {
    database: string;
    windowsPath?: string;
    table: string;
    file: string;
  } = {
    database: "",
    windowsPath: "",
    table: "",
    file: "",
  }
): Promise<boolean> => {
  const { database, windowsPath, table, file } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-schema",
  });
  const pathDatabase = path.resolve(database);
  const pathToFile = path.resolve(file);
  const result = await printCommand({
    command,
    args: [pathDatabase, `-T"${table}"`],
    file: pathToFile,
  });

  return result;
};

export { schema, schemaTable, schemaToFile, schemaTableToFile };
