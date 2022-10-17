import * as fs from "fs";
import { exec } from "node:child_process";

console.log("Diagram build starting...");

const dir = "./diagrams";
fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith(".puml")) {
        const inputFilePath = `${dir}/${file}`;
        const outputFilePath = `${dir}/generated/${file.split(".")[0]}.png`;
        exec(`puml generate ${inputFilePath} -o ${outputFilePath} -c monochrome`, (error, stdout, stderr) => {
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

console.log("Diagram build done...");
