import {
  versionMdbTools,
  version,
  tables,
  tablesAll,
  tablesSystem,
  queries,
  queriesSQL,
  sql,
  count,
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

  test("mdb-queries test.mdb users", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/test.mdb";
    const query = "UserA";
    const q = await queriesSQL({ database, windowsPath, query });
    expect(q.trim()).toEqual(
      `SELECT Users.* FROM [Users] WHERE (((Users.UserCategory)="A"))`.trim()
    );
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
