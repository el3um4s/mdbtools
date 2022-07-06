import { myCustomFunction, ciao, ver } from "../index";
// test("ciao", () => {
//   expect(ciao("Mondo")).toBe("Ciao Mondo");
// });

// test("myCustomFunction", () => {
//   expect(myCustomFunction("Mario")).toBe("Hello Mario");
// });

test("ver", async () => {
  const v = await ver();
  console.log(v);
  expect(v).toBe("mdbtools v1.0.0");
});
