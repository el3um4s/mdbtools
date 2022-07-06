import { versionMdbTools } from "../index";
// import path = require("node:path");
// test("ciao", () => {
//   expect(ciao("Mondo")).toBe("Ciao Mondo");
// });

// test("myCustomFunction", () => {
//   expect(myCustomFunction("Mario")).toBe("Hello Mario");
// });

test("ver", async () => {
  const windowsPath = "I:/Repository/NPM/mdbtools/mdbtools-win";
  const v = await versionMdbTools(windowsPath);
  console.log(v);
  expect(v).toBe("mdbtools v1.0.0");
});

// test("launch", async () => {
//   const command = {
//     command: path.join("I:/Repository/NPM/mdbtools/mdbtools-win/mdb-ver.exe"),
//     args: ["-M"],
//   };
//   const v = await launchCommand(command);
//   console.log(v);
//   expect(v).toBe("mdbtools v1.0.0");
// });
