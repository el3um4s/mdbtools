// The currently implemented SQL subset is quite small,
// supporting only single table queries, no aggregates,
//  and limited support for WHERE clauses.

import { queriesSQL } from "./mdb-queries";
import { sqlAsString } from "./mdb-sql";

const runQueryAsString = async (
  data: { database: string; windowsPath?: string; query: string } = {
    database: "",
    windowsPath: "",
    query: "",
  }
): Promise<string> => {
  const { database, windowsPath } = data;
  const sql = await queriesSQL(data);
  const result = await sqlAsString({
    database,
    windowsPath: windowsPath ? windowsPath : "",
    sql,
  });
  return result;
};

export { runQueryAsString };
