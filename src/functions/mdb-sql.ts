import { engine } from "./spawn/engine";
import { launchCommand } from "./spawn/launchCommand";
import { printCommand } from "./spawn/printCommand";

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

const sqlToFile = async (
  data: {
    database: string;
    windowsPath?: string;
    sql: string;
    file: string;
  } = {
    database: "",
    windowsPath: "",
    sql: "",
    file: "",
  }
): Promise<boolean> => {
  const { database, windowsPath, sql, file } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-sql",
  });
  const pathDatabase = path.resolve(database);
  const pathToFile = path.resolve(file);
  const result = await printCommand({
    command,
    args: [`"${pathDatabase}"`, "-F", "-P"],
    input: sql,
    file: pathToFile,
  });

  return result;
};

const sqlFromFileAsString = async (
  data: {
    database: string;
    windowsPath?: string;
    inputFile: string;
  } = {
    database: "",
    windowsPath: "",
    inputFile: "",
  }
): Promise<string> => {
  const { database, windowsPath, inputFile } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-sql",
  });
  const pathDatabase = path.resolve(database);
  const input = `--input=${path.resolve(inputFile)}`;
  const result = await launchCommand({
    command,
    args: [pathDatabase, "-F", "-P", input],
  });

  return result.trim();
};

const sqlFromFile = async (
  data: {
    database: string;
    windowsPath?: string;
    inputFile: string;
  } = {
    database: "",
    windowsPath: "",
    inputFile: "",
  }
): Promise<Record<string, unknown>[]> => {
  const result = await sqlFromFileAsString(data);

  const list = CSVToJSON(result, "\t");
  return list;
};

const sqlFromFileToFile = async (
  data: {
    database: string;
    windowsPath?: string;
    inputFile: string;
    file: string;
  } = {
    database: "",
    windowsPath: "",
    inputFile: "",
    file: "",
  }
): Promise<boolean> => {
  const { database, windowsPath, inputFile, file } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-sql",
  });
  const pathDatabase = path.resolve(database);
  const input = `--input="${path.resolve(inputFile)}"`;
  const pathToFile = path.resolve(file);
  const result = await printCommand({
    command,
    args: [`"${pathDatabase}"`, "-F", "-P", input],
    file: pathToFile,
  });

  return result;
};

export {
  sql,
  sqlAsString,
  sqlToFile,
  sqlFromFile,
  sqlFromFileAsString,
  sqlFromFileToFile,
};
