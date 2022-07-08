import { engine } from "./spawn/engine";
import { launchCommand } from "./spawn/launchCommand";

import path = require("node:path");

// https://www.30secondsofcode.org/js/s/csv-to-json
const CSVToJSON = (
  data: string,
  delimiter = ","
): Record<string, unknown>[] => {
  const dataNormalized = data.replace(/(\r\n|\n|\r)/gm, "\n").trim();
  const titles = dataNormalized
    .slice(0, dataNormalized.indexOf("\n"))
    .split(delimiter);
  return dataNormalized
    .slice(dataNormalized.indexOf("\n") + 1)
    .split("\n")
    .map((v) => {
      const values = v.split(delimiter);
      return titles.reduce(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (obj, title, index) => ((obj[title] = values[index]), obj),
        {}
      );
    });
};

const sql = async (
  data: { database: string; windowsPath?: string; sql: string } = {
    database: "",
    windowsPath: "",
    sql: "",
  }
): Promise<Record<string, unknown>[]> => {
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

  const list = CSVToJSON(result, "\t");
  return list;
};

export { sql };
