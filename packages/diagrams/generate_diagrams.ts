const dir = ".";
import * as fs from "fs";
import { exec } from "node:child_process";

fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith(".md")) {
        exec(`mmdc -i ${dir}/${file} -o ${dir}/generated/${file}`);
    }
});
