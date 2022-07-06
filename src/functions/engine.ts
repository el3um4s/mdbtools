import path = require("node:path");
import { isWindows } from "./isWindows";

const engine = (
  data: { command: string; windowsPath: string } = {
    command: "mdb-ver",
    windowsPath: "",
  }
): string => {
  return isWindows()
    ? path.join(data.windowsPath, `${data.command}.exe`)
    : data.command;
};

export { engine };
