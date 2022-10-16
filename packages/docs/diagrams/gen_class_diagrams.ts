import * as fs from "fs";
import { exec } from "node:child_process";

console.log("Class diagram generation starting...");

const services = ["api", "eth-edge"];
services.forEach((service) => {
    const dir = `../${service}/src/controllers`;
    fs.readdirSync(dir).forEach((file) => {
        if (file.startsWith("base")) {
            return;
        }

        const inputFilePath = `${dir}/${file}`;
        const outputFilePath = `./diagrams/class_diagram_${service}_${file.split(".")[0]}.puml`;
        exec(`tplant --input ${inputFilePath} --output ${outputFilePath} --associations`, (error, stdout, stderr) => {
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
    });
});

console.log("Class diagram generation done...");
