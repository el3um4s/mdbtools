import { spawn, SpawnOptionsWithoutStdio } from "node:child_process";
import { Buffer } from "buffer";

interface Cmd {
  command: string;
  args: string[];
  options?: SpawnOptionsWithoutStdio;
  input?: string | Buffer;
  file: string;
}

const printCommand = (cmd: Cmd): Promise<boolean> => {
  const { command, args, options, input, file } = cmd;

  return new Promise((resolve, reject) => {
    let result = true;

    const child = spawn(command, [...args, ">", file], {
      windowsHide: true,
      shell: true,
      ...options,
    });

    child.on("error", () => (result = false));
    child.stdin.on("error", () => (result = false));
    child.stdout.on("error", () => (result = false));
    child.stderr.on("error", () => (result = false));
    child.stderr.on("data", () => (result = false));

    child.stdout.on("data", () => {
      result = true;
    });

    child.on("close", () => {
      if (result) {
        return resolve(result);
      }

      return reject(result);
    });

    child.stdin.end(input);
  });
};

export { printCommand };
