import { sqlAsString } from "./mdb-sql";
import { tables } from "./mdb-tables";

import { titleCSVToJSON } from "./utilities/CSVToJSON";

const columnsName = async (
  data: {
    database: string;
    windowsPath?: string;
    table: string;
  } = {
    database: "",
    windowsPath: "",
    table: "",
  }
): Promise<string[]> => {
  const { database, windowsPath, table } = data;
  const sqlCode = `SELECT * FROM [${table}] LIMIT 1;`;

  const sqlString = await sqlAsString({ database, windowsPath, sql: sqlCode });
  const columns = titleCSVToJSON(sqlString, "\t");

  return columns;
};

const columnsNameTables = async (
  data: { database: string; windowsPath?: string } = {
    database: "",
    windowsPath: "",
  }
): Promise<Record<string, string[]>> => {
  const { database, windowsPath } = data;
  const listTables = await tables({ database, windowsPath });
  const listColumns = await Promise.all(
    listTables.map(async (table) => {
      const columns = await columnsName({ database, windowsPath, table });
      return { [table]: columns };
    })
  );
  const result = Object.assign({}, ...listColumns);
  return result;
};

export { columnsName, columnsNameTables };
