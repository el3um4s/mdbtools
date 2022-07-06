import { versionMdbTools, version } from "../index";

describe("ver-mdb", () => {
  test("ver-mdb -M", async () => {
    const windowsPath = "./mdbtools-win";
    const v = await versionMdbTools(windowsPath);
    expect(v).toBe("mdbtools v1.0.0");
  });

  test("ver-mdb fruit.mdb", async () => {
    const windowsPath = "./mdbtools-win";
    const database = "./src/__tests__/fruit.mdb";
    const v = await version({ database, windowsPath });
    expect(v).toBe("JET4");
  });
});
