const dir = ".";
import * as fs from "fs";
import { exec } from "node:child_process";

console.log("Diagram generation starting...");

fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith(".puml")) {
        exec(`puml generate ${file} -o generated/${file.split(".")[0]}.png -c monochrome`, (error, stdout, stderr) => {
            if (error) {
                console.log(`Error: ${error}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            if (stdout) {
                console.log(`stdout: ${stdout}`);
            }
        });
    }
});

console.log("Diagram generation done...");
