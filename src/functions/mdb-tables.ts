import { engine } from "./engine";
import { launchCommand } from "./launchCommand";

import path = require("node:path");

const tables = async (
  data: { database: string; windowsPath: string } = {
    database: "",
    windowsPath: "",
  }
): Promise<string[]> => {
  const { database, windowsPath } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-tables",
  });
  const pathDatabase = path.resolve(database);
  const result = await launchCommand({
    command,
    args: [pathDatabase, "-d;"],
  });

  const listTables = result.split(";").filter((x) => x.trim() !== "");
  return listTables;
};

const tablesAll = async (
  data: { database: string; windowsPath: string } = {
    database: "",
    windowsPath: "",
  }
): Promise<string[]> => {
  const { database, windowsPath } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-tables",
  });
  const pathDatabase = path.resolve(database);
  const result = await launchCommand({
    command,
    args: [pathDatabase, "-S", "-d;"],
  });

  const listTables = result.split(";").filter((x) => x.trim() !== "");
  return listTables;
};

const tablesSystem = async (
  data: { database: string; windowsPath: string } = {
    database: "",
    windowsPath: "",
  }
): Promise<string[]> => {
  const { database, windowsPath } = data;
  const command = engine({
    windowsPath: windowsPath ? windowsPath : "",
    command: "mdb-tables",
  });
  const pathDatabase = path.resolve(database);
  const withSystemTables = await launchCommand({
    command,
    args: [pathDatabase, "-S", "-d;"],
  });

  const withoutSystemTables = await launchCommand({
    command,
    args: [pathDatabase, "-d;"],
  });

  const listWithSys = withSystemTables
    .split(";")
    .filter((x) => x.trim() !== "");

  const listWithoutSys = withoutSystemTables
    .split(";")
    .filter((x) => x.trim() !== "");

  const listTables = listWithSys.filter((x) => !listWithoutSys.includes(x));

  return listTables;
};

export { tables, tablesAll, tablesSystem };
