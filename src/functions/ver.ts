import { exec, spawn } from "node:child_process";
import path = require("node:path");

const isEmpty = (object: any) => Object.keys(object).length === 0;

const ver = () => {
  return new Promise((resolve, reject) => {
    const stderrOutput = [];
    const errors = Object.create(null);

    const p = path.join("I:/Repository/NPM/mdbtools/mdbtools-win/mdb-ver.exe");
    const child = spawn(p, ["-M"]);

    child.on("error", (error) => (errors.spawn = error));
    child.stdin.on("error", (error) => (errors.stdin = error));
    child.stdout.on("error", (error) => (errors.stdout = error));
    child.stderr.on("error", (error) => (errors.stderr = error));
    child.stderr.on("data", (data) => stderrOutput.push(data));

    // Capture output
    const buffers: any[] = [];
    child.stdout.on("data", (data) => buffers.push(data));

    child.on("exit", () => {
      if (!isEmpty(errors)) {
        // Reject error
        return reject(Object.assign(new Error(`Error`), errors));
      }
      return resolve(Buffer.concat(buffers).toString());
    });
  });
};

// const ver = async () => {
//   const p = path.join("I:/Repository/NPM/mdbtools/mdbtools-win/mdb-ver.exe");
//   const v = spawn(p, ["-M"]);

//   const result = v.stdout.on("data", (data) => {
//     // console.log(data.toString());
//     return data.toString();
//   });

//   v.stderr.on("data", (data) => {
//     // console.error(data.toString());
//   });

//   v.on("exit", (code) => {
//     // console.log(`Child exited with code ${code}`);
//   });

//   return result;
//   //   exec(p + " -M", (err, stdout, stderr) => {
//   //     if (err) {
//   //       console.error(err);
//   //       return "ko";
//   //     }
//   //     console.log(stdout);
//   //     return stdout;
//   //   });
// };

// const bat = spawn("cmd.exe", ["/c", "my.bat"]);

// bat.stdout.on("data", (data) => {
//   console.log(data.toString());
// });

// bat.stderr.on("data", (data) => {
//   console.error(data.toString());
// });

// bat.on("exit", (code) => {
//   console.log(`Child exited with code ${code}`);
// });

export { ver };
