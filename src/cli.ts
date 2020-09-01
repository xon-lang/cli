#!/usr/bin/env node

import { translateProgram } from "@xon/translator-ts";
import * as fs from "fs";
import * as path from "path";

function compile(filename: string) {
    if (!filename) return console.log("No input file");

    const inputPath = path.resolve(process.cwd(), filename);
    const code = fs.readFileSync(inputPath).toString();
    const outputCode = translateProgram(code);
    const outputPath = path.resolve(
        path.dirname(inputPath),
        path.basename(inputPath).split(".").slice(0, -1).join(".") + ".ts"
    );
    console.log(inputPath);
    console.log(outputPath);
    fs.writeFileSync(outputPath, outputCode);
}

compile(process.argv.slice(2)[0]);
