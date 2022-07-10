import { engine } from "./spawn/engine";
import { launchCommand } from "./spawn/launchCommand";
import { printCommand } from "./spawn/printCommand";

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

const queriesToFile = async (
  data: { database: string; windowsPath?: string; file: string } = {
    database: "",
    windowsPath: "",
    file: "",
  }
): Promise<boolean> => {
  const { database, windowsPath, file } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-queries",
  });
  const pathDatabase = path.resolve(database);
  const pathToFile = path.resolve(file);
  const result = await printCommand({
    command: command,
    args: [`"${pathDatabase}"`, "-1"],
    file: pathToFile,
  });

  return result;
};

const queriesSQLToFile = async (
  data: {
    database: string;
    windowsPath?: string;
    query: string;
    file: string;
  } = {
    database: "",
    windowsPath: "",
    query: "",
    file: "",
  }
): Promise<boolean> => {
  const { database, windowsPath, file, query } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-queries",
  });
  const pathDatabase = path.resolve(database);
  const pathToFile = path.resolve(file);
  const result = await printCommand({
    command: command,
    args: [`"${pathDatabase}"`, `"${query}"`],
    file: pathToFile,
  });

  return result;
};

export { queries, queriesSQL, queriesToFile, queriesSQLToFile };
