import {
  versionMdbTools,
  version,
  tables,
  tablesAll,
  tablesSystem,
  queries,
  queriesSQL,
  queriesToFile,
  queriesSQLToFile,
  sql,
  sqlAsString,
  sqlToFile,
  sqlFromFile,
  sqlFromFileAsString,
  sqlFromFileToFile,
  count,
  tableToJson,
  tableToCSV,
  tablesToFile,
  tablesAllToFile,
  tableToCSVFile,
  schema,
  schemaTable,
  schemaToFile,
  schemaTableToFile,
  columnsName,
  columnsNameTables,
} from "../index";

describe("mdb-ver", () => {
  test("mdb-ver", async () => {
    const windowsPath = "./mdbtools-win";
    const v = await versionMdbTools(windowsPath);
    expect(v).toContain("mdbtools");
  });

  test("mdb-ver fruit.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/fruit.mdb";
    const v = await version({ database, windowsPath });
    expect(v).toBe("JET4");
  });

  test("mdb-ver test.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const v = await version({ database, windowsPath });
    expect(v).toBe("JET4");
  });

  test("mdb-ver test copy.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test copy.mdb";
    const v = await version({ database, windowsPath });
    expect(v).toBe("JET4");
  });

  test("mdb-ver test 2.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const v = await version({ database, windowsPath });
    expect(v).toBe("JET4");
  });

  test("mdb-ver test 2° còpì.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const v = await version({ database, windowsPath });
    expect(v).toBe("JET4");
  });
});

describe("mdb-tables", () => {
  test("mdb-tables fruit.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/fruit.mdb";
    const t = await tables({ database, windowsPath });
    const expected = [
      "Fruit",
      "Fruit Salad",
      "Veggie Salad",
      "Muffin/Bread",
      "Dried",
    ];
    expect(t.sort()).toEqual(expected.sort());
  });

  test(`mdb-tables "test copy.mdb"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test copy.mdb";
    const t = await tables({ database, windowsPath });
    const expected = [
      "Colors",
      "Colors Table Two",
      "Colors-Table Others",
      "Dictionary",
      "Users",
    ];
    expect(t.sort()).toEqual(expected.sort());
  });

  test(`mdb-tables "test 2.mdb"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const t = await tables({ database, windowsPath });
    const expected = [
      "Colors",
      "Colors Table Two",
      "Colors-Table Others",
      "Dictionary",
      "Users",
      "Colors 1°à",
    ];
    expect(t.sort()).toEqual(expected.sort());
  });

  test(`mdb-tables "test 2° còpì.mdb"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const t = await tables({ database, windowsPath });
    const expected = [
      "Colors",
      "Colors Table Two",
      "Colors-Table Others",
      "Dictionary",
      "Users",
      "Colors 1°à",
    ];
    expect(t.sort()).toEqual(expected.sort());
  });

  test("mdb-tables ALL fruit.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/fruit.mdb";
    const t = await tablesAll({ database, windowsPath });
    const expected = [
      "MSysObjects",
      "MSysACEs",
      "MSysQueries",
      "MSysRelationships",
      "MSysAccessObjects",
      "Fruit",
      "Fruit Salad",
      "Veggie Salad",
      "Muffin/Bread",
      "Dried",
      "MSysNavPaneGroupCategories",
      "MSysNavPaneGroups",
      "MSysNavPaneGroupToObjects",
      "MSysNavPaneObjectIDs",
      "MSysAccessXML",
      "MSysNameMap",
    ];
    expect(t.sort()).toEqual(expected.sort());
  });

  test("mdb-tables ONLY SYSTEM fruit.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/fruit.mdb";
    const t = await tablesSystem({ database, windowsPath });
    const expected = [
      "MSysObjects",
      "MSysACEs",
      "MSysQueries",
      "MSysRelationships",
      "MSysAccessObjects",
      "MSysNavPaneGroupCategories",
      "MSysNavPaneGroups",
      "MSysNavPaneGroupToObjects",
      "MSysNavPaneObjectIDs",
      "MSysAccessXML",
      "MSysNameMap",
    ];
    expect(t.sort()).toEqual(expected.sort());
  });

  test("mdb-tables fruit.mdb > mdb-tables_tables-fruit.txt", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/fruit.mdb";
    const file = "./src/__tests__/__to_file__/mdb-tables_tables-fruit.txt";
    const t = await tablesToFile({ database, windowsPath, file });

    expect(t).toBeTruthy();
  });

  test("mdb-tables fruit.mdb -S > mdb-tables_tables-fruit-with-system-tables.txt", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/fruit.mdb";
    const fileWithSystem =
      "./src/__tests__/__to_file__/mdb-tables_tables-fruit-with-system-tables.txt";
    const t = await tablesAllToFile({
      database,
      windowsPath,
      file: fileWithSystem,
    });

    expect(t).toBeTruthy();
  });

  test(`mdb-tables "test.mdb" > "mdb-tables_test.txt"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const file = "./src/__tests__/__to_file__/mdb-tables_test.txt";
    const t = await tablesToFile({
      database,
      windowsPath,
      file,
    });

    expect(t).toBeTruthy();
  });

  test(`mdb-tables "test copy.mdb" > "mdb-tables_test copy.txt"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test copy.mdb";
    const file = "./src/__tests__/__to_file__/mdb-tables_test copy.txt";
    const t = await tablesToFile({
      database,
      windowsPath,
      file,
    });

    expect(t).toBeTruthy();
  });

  test(`mdb-tables "test 2.mdb" -S > "mdb-tables_test 2.txt"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const file = "./src/__tests__/__to_file__/mdb-tables_test 2.txt";

    const t = await tablesToFile({
      database,
      windowsPath,
      file,
    });

    expect(t).toBeTruthy();
  });

  test(`mdb-tables "test 2° còpì.mdb" -S > "mdb-tables_test 2° còpì.txt"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const file = "./src/__tests__/__to_file__/mdb-tables_test 2° còpì.txt";

    const t = await tablesToFile({
      database,
      windowsPath,
      file,
    });

    expect(t).toBeTruthy();
  });
});

describe("mdb-queries", () => {
  test("mdb-queries test.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const q = await queries({ windowsPath, database });
    const expected = [
      "UserA",
      "MainColors",
      "ChangeValueDogTo40",
      "ChangeValueDotTo4",
      "AddApple",
      "DeleteApple",
      "aàeèéiìoòuù",
    ];
    expect(q.sort()).toEqual(expected.sort());
  });

  test("mdb-queries test copy.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test copy.mdb";
    const q = await queries({ windowsPath, database });
    const expected = [
      "UserA",
      "MainColors",
      "ChangeValueDogTo40",
      "ChangeValueDotTo4",
      "AddApple",
      "DeleteApple",
      "aàeèéiìoòuù",
    ];
    expect(q.sort()).toEqual(expected.sort());
  });

  test("mdb-queries test 2.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const q = await queries({ windowsPath, database });
    const expected = [
      "UserA",
      "MainColors",
      "aàeèéiìoòuù",
      "query 2° ù",
      "Query1",
      "query 2",
    ];
    expect(q.sort()).toEqual(expected.sort());
  });

  test("mdb-queries test 2° còpì.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const q = await queries({ windowsPath, database });
    const expected = [
      "UserA",
      "MainColors",
      "aàeèéiìoòuù",
      "query 2° ù",
      "Query1",
      "query 2",
    ];
    expect(q.sort()).toEqual(expected.sort());
  });

  test("mdb-queries test.mdb UserA", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const query = "UserA";
    const q = await queriesSQL({ database, windowsPath, query });
    expect(q.trim()).toEqual(
      `SELECT Users.* FROM [Users] WHERE (((Users.UserCategory)="A"))`.trim()
    );
  });

  test("mdb-queries test copy.mdb UserA", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test copy.mdb";
    const query = "UserA";
    const q = await queriesSQL({ database, windowsPath, query });
    expect(q.trim()).toEqual(
      `SELECT Users.* FROM [Users] WHERE (((Users.UserCategory)="A"))`.trim()
    );
  });

  test("mdb-queries test 2.mdb UserA", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const query = "UserA";
    const q = await queriesSQL({ database, windowsPath, query });
    expect(q.trim()).toEqual(
      `SELECT Users.* FROM [Users] WHERE (((Users.UserCategory)="A"))`.trim()
    );
  });

  test("mdb-queries test 2° còpì.mdb UserA", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const query = "UserA";
    const q = await queriesSQL({ database, windowsPath, query });
    expect(q.trim()).toEqual(
      `SELECT Users.* FROM [Users] WHERE (((Users.UserCategory)="A"))`.trim()
    );
  });

  test("mdb-queries test.mdb > mdb-queries_test-queries.txt", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const file = "./src/__tests__/__to_file__/mdb-queries_test-queries.txt";
    const t = await queriesToFile({ database, windowsPath, file });

    expect(t).toBeTruthy();
  });

  test("mdb-queries test.mdb UserA > mdb-queries_test-queries-usera.txt", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const query = "UserA";
    const file =
      "./src/__tests__/__to_file__/mdb-queries_test-queries-usera.txt";
    const t = await queriesSQLToFile({ database, windowsPath, query, file });

    expect(t).toBeTruthy();
  });

  test("mdb-queries test 2.mdb UserA > mdb-queries_test 2 queries usera.txt", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const query = "UserA";
    const file =
      "./src/__tests__/__to_file__/mdb-queries_test 2 queries usera.txt";
    const t = await queriesSQLToFile({ database, windowsPath, query, file });

    expect(t).toBeTruthy();
  });

  test("mdb-queries test 2° còpì.mdb UserA > mdb-queries_test 2° còpì queries usera.txt", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const query = "UserA";
    const file =
      "./src/__tests__/__to_file__/mdb-queries_test 2° còpì queries usera.txt";
    const t = await queriesSQLToFile({ database, windowsPath, query, file });

    expect(t).toBeTruthy();
  });

  test("mdb-queries test 2° còpì.mdb query 2 > mdb-queries_test 2° còpì queries query 2.txt", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const query = "query 2";
    const file =
      "./src/__tests__/__to_file__/mdb-queries_test 2° còpì queries query 2.txt";
    const t = await queriesSQLToFile({ database, windowsPath, query, file });

    expect(t).toBeTruthy();
  });
});

describe("mdb-sql", () => {
  test(`"SELECT * FROM Colors WHERE Value > 10;" | mdb-sql test.mdb`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const s = "SELECT * FROM Colors WHERE Value > 10;";

    const q = await sql({ database, windowsPath, sql: s });
    const expected = [
      {
        Colors: "Blue",
        Value: "16",
      },
      {
        Colors: "Yellow",
        Value: "12",
      },
    ];
    expect(q.sort()).toEqual(expected.sort());
  });

  test(`"SELECT * FROM Colors WHERE Value > 10;" | mdb-sql test.mdb AS STRING`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const s = "SELECT * FROM Colors WHERE Value > 10;";
    const q = await sqlAsString({ database, windowsPath, sql: s });
    const expected = `ColorsValueBlue16Yellow12`;
    expect(q.replace(/(\r\n|\n|\r| |\t)/gm, "").trim()).toEqual(expected);
  });

  test(`"SELECT * FROM Colors WHERE Value > 10;" | mdb-sql "test 2.mdb"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const s = "SELECT * FROM Colors WHERE Value > 10;";

    const q = await sql({ database, windowsPath, sql: s });
    const expected = [
      {
        Colors: "Blue",
        Value: "16",
      },
      {
        Colors: "Yellow",
        Value: "12",
      },
    ];
    expect(q.sort()).toEqual(expected.sort());
  });

  test(`"SELECT * FROM Colors WHERE Value > 10;" | mdb-sql "test 2.mdb" AS STRING`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const s = "SELECT * FROM Colors WHERE Value > 10;";
    const q = await sqlAsString({ database, windowsPath, sql: s });
    const expected = `ColorsValueBlue16Yellow12`;
    expect(q.replace(/(\r\n|\n|\r| |\t)/gm, "").trim()).toEqual(expected);
  });

  test(`"SELECT * FROM Colors WHERE Value > 10;" | mdb-sql "test.mdb" > "mdb-sql sql result to file.csv"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const s = "SELECT * FROM Colors WHERE Value > 10;";
    const file = "./src/__tests__/__to_file__/mdb-sql sql result to file.csv";
    const q = await sqlToFile({ database, windowsPath, sql: s, file });

    expect(q).toBeTruthy();
  });

  test(`"SELECT * FROM Colors WHERE Value > 10;" | mdb-sql "test 2.mdb" > "mdb-sql test 2 sql result to file.csv"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const s = "SELECT * FROM Colors WHERE Value > 10;";
    const file =
      "./src/__tests__/__to_file__/mdb-sql test 2 sql result to file.csv";
    const q = await sqlToFile({ database, windowsPath, sql: s, file });

    expect(q).toBeTruthy();
  });

  test(`"SELECT * FROM Colors WHERE Value > 10;" | mdb-sql "test 2° còpì.mdb" > "mdb-sql test 2° còpì sql result to file.csv"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const s = "SELECT * FROM Colors WHERE Value > 10;";
    const file =
      "./src/__tests__/__to_file__/mdb-sql test 2° còpì sql result to file.csv";
    const q = await sqlToFile({ database, windowsPath, sql: s, file });

    expect(q).toBeTruthy();
  });

  test(`mdb-sql test.mdb --input="select colors.sql" AS STRING`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const inputFile = "./src/__tests__/__to_file__/select colors.sql";
    const q = await sqlFromFileAsString({ database, windowsPath, inputFile });
    const expected = `ColorsValueBlue16Yellow12`;
    expect(q.replace(/(\r\n|\n|\r| |\t)/gm, "").trim()).toEqual(expected);
  });

  test(`mdb-sql "test 2.mdb" --input="select colors.sql" AS STRING`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const inputFile = "./src/__tests__/__to_file__/select colors.sql";
    const q = await sqlFromFileAsString({ database, windowsPath, inputFile });
    const expected = `ColorsValueBlue16Yellow12`;
    expect(q.replace(/(\r\n|\n|\r| |\t)/gm, "").trim()).toEqual(expected);
  });

  test(`mdb-sql "test 2° còpì.mdb" --input="select colors.sql" AS STRING`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const inputFile = "./src/__tests__/__to_file__/select colors.sql";
    const q = await sqlFromFileAsString({ database, windowsPath, inputFile });
    const expected = `ColorsValueBlue16Yellow12`;
    expect(q.replace(/(\r\n|\n|\r| |\t)/gm, "").trim()).toEqual(expected);
  });

  test(`mdb-sql test.mdb --input="select colors.sql"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const inputFile = "./src/__tests__/__to_file__/select colors.sql";
    const q = await sqlFromFile({ database, windowsPath, inputFile });
    const expected = [
      {
        Colors: "Blue",
        Value: "16",
      },
      {
        Colors: "Yellow",
        Value: "12",
      },
    ];
    expect(q.sort()).toEqual(expected.sort());
  });

  test(`mdb-sql "test 2.mdb" --input="select colors.sql"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const inputFile = "./src/__tests__/__to_file__/select colors.sql";
    const q = await sqlFromFile({ database, windowsPath, inputFile });
    const expected = [
      {
        Colors: "Blue",
        Value: "16",
      },
      {
        Colors: "Yellow",
        Value: "12",
      },
    ];
    expect(q.sort()).toEqual(expected.sort());
  });

  test(`mdb-sql "test 2° còpì.mdb" --input="select colors.sql"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const inputFile = "./src/__tests__/__to_file__/select colors.sql";
    const q = await sqlFromFile({ database, windowsPath, inputFile });
    const expected = [
      {
        Colors: "Blue",
        Value: "16",
      },
      {
        Colors: "Yellow",
        Value: "12",
      },
    ];
    expect(q.sort()).toEqual(expected.sort());
  });

  test(`mdb-sql test.mdb --input="select colors.sql" > "mdb-sql sql from file to file.csv"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const inputFile = "./src/__tests__/__to_file__/select colors.sql";
    const file =
      "./src/__tests__/__to_file__/mdb-sql sql from file to file.csv";
    const q = await sqlFromFileToFile({
      database,
      windowsPath,
      inputFile,
      file,
    });

    expect(q).toBeTruthy();
  });

  test(`mdb-sql "test 2.mdb" --input="select colors.sql" > "mdb-sql test 2 sql from file to file.csv"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const inputFile = "./src/__tests__/__to_file__/select colors.sql";
    const file =
      "./src/__tests__/__to_file__/mdb-sql test 2 sql from file to file.csv";
    const q = await sqlFromFileToFile({
      database,
      windowsPath,
      inputFile,
      file,
    });

    expect(q).toBeTruthy();
  });

  test(`mdb-sql "test 2° còpì.mdb" --input="select colors.sql" > "mdb-sql test 2° còpì sql from file to file.csv"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const inputFile = "./src/__tests__/__to_file__/select colors.sql";
    const file =
      "./src/__tests__/__to_file__/mdb-sql test 2° còpì sql from file to file.csv";
    const q = await sqlFromFileToFile({
      database,
      windowsPath,
      inputFile,
      file,
    });

    expect(q).toBeTruthy();
  });
});

describe("mdb-count", () => {
  test("mdb-count test.mdb colors", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const table = "Colors";
    const c = await count({ database, windowsPath, table });
    expect(c).toEqual(7);
  });

  test("mdb-count test 2.mdb colors", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const table = "Colors";
    const c = await count({ database, windowsPath, table });
    expect(c).toEqual(7);
  });

  test("mdb-count test 2° còpì.mdb colors", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const table = "Colors";
    const c = await count({ database, windowsPath, table });
    expect(c).toEqual(7);
  });
});

describe("mdb-json", () => {
  test("mdb-json test.mdb Colors", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const table = "Colors";
    const j = await tableToJson({ database, windowsPath, table });
    const expected = [
      { Colors: "Red", Value: 10 },
      { Colors: "Green", Value: 5 },
      { Colors: "Blue", Value: 16 },
      { Colors: "Black", Value: 1 },
      { Colors: "Yellow", Value: 12 },
      { Colors: "White", Value: 10 },
      { Colors: "Others", Value: 0 },
    ];
    expect(j).toEqual(expected.sort());
  });

  test("mdb-json test 2.mdb Colors", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const table = "Colors";
    const j = await tableToJson({ database, windowsPath, table });
    const expected = [
      { Colors: "Red", Value: 10 },
      { Colors: "Green", Value: 5 },
      { Colors: "Blue", Value: 16 },
      { Colors: "Black", Value: 1 },
      { Colors: "Yellow", Value: 12 },
      { Colors: "White", Value: 10 },
      { Colors: "Others", Value: 0 },
    ];
    expect(j).toEqual(expected.sort());
  });

  test("mdb-json test 2° còpì.mdb Colors", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const table = "Colors";
    const j = await tableToJson({ database, windowsPath, table });
    const expected = [
      { Colors: "Red", Value: 10 },
      { Colors: "Green", Value: 5 },
      { Colors: "Blue", Value: 16 },
      { Colors: "Black", Value: 1 },
      { Colors: "Yellow", Value: 12 },
      { Colors: "White", Value: 10 },
      { Colors: "Others", Value: 0 },
    ];
    expect(j).toEqual(expected.sort());
  });
});

describe("mdb-export", () => {
  test("mdb-export test.mdb colors", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const table = "Colors";
    const csv = await tableToCSV({ database, windowsPath, table });
    const expected = `Colors,Value
"Red",10
"Green",5
"Blue",16
"Black",1
"Yellow",12
"White",10
"Others",0`;
    expect(csv).toEqual(expected.trim());
  });

  test("mdb-export test 2.mdb colors", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const table = "Colors";
    const csv = await tableToCSV({ database, windowsPath, table });
    const expected = `Colors,Value
"Red",10
"Green",5
"Blue",16
"Black",1
"Yellow",12
"White",10
"Others",0`;
    expect(csv).toEqual(expected.trim());
  });

  test("mdb-export test 2° còpì.mdb colors", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const table = "Colors";
    const csv = await tableToCSV({ database, windowsPath, table });
    const expected = `Colors,Value
"Red",10
"Green",5
"Blue",16
"Black",1
"Yellow",12
"White",10
"Others",0`;
    expect(csv).toEqual(expected.trim());
  });

  test("mdb-export test.mdb Colors-Table Others", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const table = "Colors-Table Others";
    const csv = await tableToCSV({ database, windowsPath, table });
    const expected = `Colors,Value,Second Value,Others-A
"Red",10,5,"R"
"Green",5,3,"G"
"Blue",16,4,"B"
"Black",1,3,"N"
"Yellow",12,3,"Y"
"White",10,1,"W"
"Others",0,0,"A"`;
    expect(csv).toEqual(expected.trim());
  });

  test("mdb-export test 2.mdb Colors-Table Others", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const table = "Colors-Table Others";
    const csv = await tableToCSV({ database, windowsPath, table });
    const expected = `Colors,Value,Second Value,Others-A
"Red",10,5,"à"
"Green",5,3,"1a"
"Blue",16,4,"ò"
"Black",1,3,"2°"
"Yellow",12,3,"Y"
"White",10,1,"W"
"Others",0,0,"A"`;
    expect(csv).toEqual(expected.trim());
  });

  test("mdb-export test 2° còpì.mdb Colors-Table Others", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const table = "Colors-Table Others";
    const csv = await tableToCSV({ database, windowsPath, table });
    const expected = `Colors,Value,Second Value,Others-A
"Red",10,5,"à"
"Green",5,3,"1a"
"Blue",16,4,"ò"
"Black",1,3,"2°"
"Yellow",12,3,"Y"
"White",10,1,"W"
"Others",0,0,"A"`;
    expect(csv).toEqual(expected.trim());
  });

  test("mdb-export test.mdb colors > mdb-export test-export-colors.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const table = "Colors";
    const file =
      "./src/__tests__/__to_file__/mdb-export test-export-colors.csv";
    const options = "-d; -Q";
    const t = await tableToCSVFile({
      database,
      windowsPath,
      table,
      file,
      options,
    });

    expect(t).toBeTruthy();
  });

  test("mdb-export test.mdb Colors-Table Others > mdb-export Colors-Table Others.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const table = "Colors-Table Others";
    const file =
      "./src/__tests__/__to_file__/mdb-export Colors-Table Others.csv";
    const options = "-d; -Q";
    const t = await tableToCSVFile({
      database,
      windowsPath,
      table,
      file,
      options,
    });

    expect(t).toBeTruthy();
  });

  test("mdb-export test 2.mdb colors > mdb-export test 2 test-export-colors.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const table = "Colors";
    const file =
      "./src/__tests__/__to_file__/mdb-export test 2 test-export-colors.csv";
    const options = "-d; -Q";
    const t = await tableToCSVFile({
      database,
      windowsPath,
      table,
      file,
      options,
    });

    expect(t).toBeTruthy();
  });

  test("mdb-export test 2.mdb Colors-Table Others > mdb-export test 2 Colors-Table Others.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const table = "Colors-Table Others";
    const file =
      "./src/__tests__/__to_file__/mdb-export test 2 Colors-Table Others.csv";
    const options = "-d; -Q";
    const t = await tableToCSVFile({
      database,
      windowsPath,
      table,
      file,
      options,
    });

    expect(t).toBeTruthy();
  });

  test("mdb-export test 2° còpì.mdb colors > mdb-export test 2° còpì test-export-colors.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const table = "Colors";
    const file =
      "./src/__tests__/__to_file__/mdb-export test 2° còpì test-export-colors.csv";
    const options = "-d; -Q";
    const t = await tableToCSVFile({
      database,
      windowsPath,
      table,
      file,
      options,
    });

    expect(t).toBeTruthy();
  });

  test("mdb-export test 2° còpì.mdb Colors-Table Others > mdb-export test 2° còpì Colors-Table Others.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const table = "Colors-Table Others";
    const file =
      "./src/__tests__/__to_file__/mdb-export test 2° còpì Colors-Table Others.csv";
    const options = "-d; -Q";
    const t = await tableToCSVFile({
      database,
      windowsPath,
      table,
      file,
      options,
    });

    expect(t).toBeTruthy();
  });
});

describe("mdb-schema", () => {
  test("mdb-schema test.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const s = await schema({ database, windowsPath });
    expect(s.length).toBeGreaterThan(0);
  });

  test("mdb-schema test 2.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const s = await schema({ database, windowsPath });
    expect(s.length).toBeGreaterThan(0);
  });

  test("mdb-schema test 2° còpì.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const s = await schema({ database, windowsPath });
    expect(s.length).toBeGreaterThan(0);
  });

  test("mdb-schema test.mdb Colors", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const table = "Colors";
    const s = await schemaTable({ database, windowsPath, table });
    expect(s.length).toBeGreaterThan(0);
  });

  test("mdb-schema test.mdb Colors Table Two ", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const table = "Colors Table Two";
    const s = await schemaTable({ database, windowsPath, table });
    expect(s.length).toBeGreaterThan(0);
  });

  test("mdb-schema test.mdb  > mdb-schema schema-test.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const file = "./src/__tests__/__to_file__/mdb-schema schema-test.csv";
    const s = await schemaToFile({ database, windowsPath, file });
    expect(s).toBeTruthy();
  });

  test("mdb-schema test.mdb Colors  > mdb-schema schema-test-color.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const table = "Colors";
    const file = "./src/__tests__/__to_file__/mdb-schema schema-test-color.csv";
    const s = await schemaTableToFile({ database, windowsPath, table, file });
    expect(s).toBeTruthy();
  });

  test("mdb-schema test.mdb Colors Table Two  > mdb-schema schema-test-color-2.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const table = "Colors Table Two";
    const file =
      "./src/__tests__/__to_file__/mdb-schema schema-test-color-2.csv";
    const s = await schemaTableToFile({ database, windowsPath, table, file });
    expect(s).toBeTruthy();
  });

  test("mdb-schema test 2.mdb  > mdb-schema test 2 schema-test.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const file =
      "./src/__tests__/__to_file__/mdb-schema test 2 schema-test.csv";
    const s = await schemaToFile({ database, windowsPath, file });
    expect(s).toBeTruthy();
  });

  test("mdb-schema test 2.mdb Colors  > mdb-schema test 2 schema-test-color.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const table = "Colors";
    const file =
      "./src/__tests__/__to_file__/mdb-schema test 2 schema-test-color.csv";
    const s = await schemaTableToFile({ database, windowsPath, table, file });
    expect(s).toBeTruthy();
  });

  test("mdb-schema test 2.mdb Colors Table Two  > mdb-schema test 2 schema-test-color-2.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const table = "Colors Table Two";
    const file =
      "./src/__tests__/__to_file__/mdb-schema test 2 schema-test-color-2.csv";
    const s = await schemaTableToFile({ database, windowsPath, table, file });
    expect(s).toBeTruthy();
  });

  test("mdb-schema test 2° còpì.mdb  > mdb-schema test 2° còpì schema-test.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const file =
      "./src/__tests__/__to_file__/mdb-schema test 2° còpì schema-test.csv";
    const s = await schemaToFile({ database, windowsPath, file });
    expect(s).toBeTruthy();
  });

  test("mdb-schema test 2° còpì.mdb Colors  > mdb-schema test 2° còpì schema-test-color.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const table = "Colors";
    const file =
      "./src/__tests__/__to_file__/mdb-schema test 2° còpì schema-test-color.csv";
    const s = await schemaTableToFile({ database, windowsPath, table, file });
    expect(s).toBeTruthy();
  });

  test("mdb-schema test 2° còpì.mdb Colors Table Two  > mdb-schema test 2° còpì schema-test-color-2.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const table = "Colors Table Two";
    const file =
      "./src/__tests__/__to_file__/mdb-schema test 2° còpì schema-test-color-2.csv";
    const s = await schemaTableToFile({ database, windowsPath, table, file });
    expect(s).toBeTruthy();
  });
});

describe("utilities-columnsName", () => {
  test("columnsName test.mdb Colors", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const table = "Colors";
    const c = await columnsName({ database, windowsPath, table });
    const expected = ["Colors", "Value"];
    expect(c.sort()).toEqual(expected.sort());
  });

  test("columnsName test 2.mdb Colors", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const table = "Colors";
    const c = await columnsName({ database, windowsPath, table });
    const expected = ["Colors", "Value"];
    expect(c.sort()).toEqual(expected.sort());
  });

  test("columnsName test 2° còpì.mdb Colors", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const table = "Colors";
    const c = await columnsName({ database, windowsPath, table });
    const expected = ["Colors", "Value"];
    expect(c.sort()).toEqual(expected.sort());
  });

  test("columnsNameTables test.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";

    const c = await columnsNameTables({ database, windowsPath });

    const expected: Record<string, string[]> = {
      Users: [
        "UserID",
        "UserName",
        "UserSex",
        "UserBirthday",
        "UserTelephone",
        "UserValue",
        "UserCategory",
      ],
      Colors: ["Colors", "Value"],
      Dictionary: ["Number", "Word"],
      "Colors Table Two": ["Colors", "Value"],
      "Colors-Table Others": ["Colors", "Value", "Second Value", "Others-A"],
    };

    const expectedKeys = Object.keys(expected);
    const cKeys = Object.keys(c);

    expect(cKeys.sort()).toEqual(expectedKeys.sort());

    expectedKeys.forEach((key: string) => {
      expect(c[key].sort()).toEqual(expected[key].sort());
    });
  });

  test("columnsNameTables test copy.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test copy.mdb";

    const c = await columnsNameTables({ database, windowsPath });

    const expected: Record<string, string[]> = {
      Users: [
        "UserID",
        "UserName",
        "UserSex",
        "UserBirthday",
        "UserTelephone",
        "UserValue",
        "UserCategory",
      ],
      Colors: ["Colors", "Value"],
      Dictionary: ["Number", "Word"],
      "Colors Table Two": ["Colors", "Value"],
      "Colors-Table Others": ["Colors", "Value", "Second Value", "Others-A"],
    };

    const expectedKeys = Object.keys(expected);
    const cKeys = Object.keys(c);

    expect(cKeys.sort()).toEqual(expectedKeys.sort());

    expectedKeys.forEach((key: string) => {
      expect(c[key].sort()).toEqual(expected[key].sort());
    });
  });
});

describe.skip("anomaly", () => {
  test(`mdb-queries "test 2.mdb" "query 2° ù"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const query = "query 2";
    const q = await queriesSQL({ database, windowsPath, query });
    expect(q.trim()).toEqual(`SELECT [Colors 1°à].* FROM [Colors 1°à]`.trim());
  });

  test(`mdb-queries "test 2° còpì.mdb" "query 2° ù"`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const query = "query 2";
    const q = await queriesSQL({ database, windowsPath, query });
    expect(q.trim()).toEqual(`SELECT [Colors 1°à].* FROM [Colors 1°à]`.trim());
  });

  test("mdb-queries test 2° còpì.mdb query 2° ù > mdb-queries_test 2° còpì queries query 2° ù.txt", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2° còpì.mdb";
    const query = "query 2° ù";
    const file =
      "./src/__tests__/__to_file__/mdb-queries_test 2° còpì queries query 2° ù.txt";
    const t = await queriesSQLToFile({ database, windowsPath, query, file });

    expect(t).toBeTruthy();
  });

  test("mdb-export test 2.mdb Colors 1°à > mdb-export test 2 test-export-Colors 1°à.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test 2.mdb";
    const table = "Colors 1°à";
    const file =
      "./src/__tests__/__to_file__/mdb-export test 2 test-export-Colors 1°à.csv";
    const options = "-d; -Q";
    const t = await tableToCSVFile({
      database,
      windowsPath,
      table,
      file,
      options,
    });
    expect(t).toBeTruthy();
  });
});
