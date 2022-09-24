const dir = ".";
import * as fs from "fs";
import { exec } from "node:child_process";

fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith(".md")) {
        exec(`mmdc -i ${dir}/${file} -o ${dir}/generated/${file}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`Error: ${error}`);
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }
});
