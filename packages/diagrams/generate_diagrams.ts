const dir = ".";
import * as fs from "fs";
import { exec } from "node:child_process";

fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith(".puml")) {
        exec(`puml generate ${file} -o ${file.split(".")[0]}.png -c monochrome`, (error, stdout, stderr) => {
            if (error) {
                console.log(`Error: ${error}`);
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }
});
