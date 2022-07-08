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
  count,
  tableToJson,
  tableToCSV,
  tablesToFile,
  tablesAllToFile,
  tableToCSVFile,
  schema,
  schemaTable,
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

  test("mdb-tables fruit.mdb > tables-fruit.txt", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/fruit.mdb";
    const file = "./src/__tests__/__to_file__/tables-fruit.txt";
    const t = await tablesToFile({ database, windowsPath, file });

    expect(t).toBeTruthy();
  });

  test("mdb-tables fruit.mdb -S > tables-fruit-with-system-tables.txt", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/fruit.mdb";
    const fileWithSystem =
      "./src/__tests__/__to_file__/tables-fruit-with-system-tables.txt";
    const t = await tablesAllToFile({
      database,
      windowsPath,
      file: fileWithSystem,
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

  test("mdb-queries test.mdb UserA", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const query = "UserA";
    const q = await queriesSQL({ database, windowsPath, query });
    expect(q.trim()).toEqual(
      `SELECT Users.* FROM [Users] WHERE (((Users.UserCategory)="A"))`.trim()
    );
  });

  test("mdb-queries test.mdb > test-queries.txt", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const file = "./src/__tests__/__to_file__/test-queries.txt";
    const t = await queriesToFile({ database, windowsPath, file });

    expect(t).toBeTruthy();
  });

  test("mdb-queries test.mdb UserA > test-queries-usera.txt", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const query = "UserA";
    const file = "./src/__tests__/__to_file__/test-queries-usera.txt";
    const t = await queriesSQLToFile({ database, windowsPath, query, file });

    expect(t).toBeTruthy();
  });
});

describe("mdb-sql", () => {
  test(`"SELECT * FROM Colors WHERE Value > 10;" | mdb-sql test.mdb`, async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const s = "SELECT * FROM Colors WHERE Value > 10;";
    // const s = "SELECT * FROM Users WHERE  UserValue < 10;";
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
});

describe("mdb-count", () => {
  test("mdb-count test.mdb colors", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
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

  test("mdb-export test.mdb colors > test-export-colors.csv", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const table = "Colors";
    const file = "./src/__tests__/__to_file__/test-export-colors.csv";
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
  test("mdb-schema test.mdb Colors", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const table = "Colors";
    const s = await schemaTable({ database, windowsPath, table });
    expect(s.length).toBeGreaterThan(0);
  });
});
