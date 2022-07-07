import { spawn, SpawnOptionsWithoutStdio } from "node:child_process";
import { Buffer } from "buffer";

import { decode } from "../windows-1252/windows-1252";

const isEmpty = (object: Record<string, unknown>): boolean =>
  Object.keys(object).length === 0;

const exitMessages: Record<number, string> = {
  1: "Uncaught Fatal Exception",
  3: "Internal JavaScript Parse Error",
  4: "Internal JavaScript Evaluation Failure",
  5: "Fatal Error",
  6: "Non-function Internal Exception Handler",
  7: "Internal Exception Handler Run-Time Failure",
  9: "Invalid Argument",
  10: "Internal JavaScript Run-Time Failure",
  12: "Invalid Debug Argument",
};

interface Cmd {
  command: string;
  args: string[];
  options?: SpawnOptionsWithoutStdio;
  input?: string | Buffer;
}

const launchCommand = (cmd: Cmd): Promise<string> => {
  const { command, args, options, input } = cmd;

  return new Promise((resolve, reject) => {
    const encoding: BufferEncoding = "utf8";
    const stderrOutput: Uint8Array[] = [];
    const errors = Object.create(null);

    const child = spawn(command, args, {
      windowsHide: true,
      ...options,
    });

    child.on("error", (error) => (errors.spawn = error));
    child.stdin.on("error", (error) => (errors.stdin = error));
    child.stdout.on("error", (error) => (errors.stdout = error));
    child.stderr.on("error", (error) => (errors.stderr = error));
    child.stderr.on("data", (data) => stderrOutput.push(data));

    const result: string[] = [];
    child.stdout.on("data", (data) => {
      const text = decode(data, {}).replaceAll("À,", "").replaceAll("À", "");
      result.push(text);
    });

    child.on("close", (exitCode) => {
      if (exitCode !== 0 && exitCode != null) {
        errors.exitMessage = exitMessages[exitCode];
      }

      if (stderrOutput.length) {
        errors.process = Buffer.concat(stderrOutput).toString(encoding);
      }

      if (!isEmpty(errors)) {
        errors.exitCode = exitCode;
        return reject(
          Object.assign(new Error(`Spawn ${command} error`), errors)
        );
      }

      return resolve(result.join(""));
    });

    child.stdin.end(input, encoding);
  });
};

export { launchCommand };
