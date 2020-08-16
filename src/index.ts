import { parseCode, ProgramTree } from "@xon/ast";
import { ProgramTranslator } from "@xon/translator-ts";
import * as fs from "fs";
import * as path from "path";

function run(filename: string) {
    if (!filename) return console.log("No input file");

    const inputPath = path.resolve(process.cwd(), filename);
    const code = fs.readFileSync(inputPath).toString();
    const tree = parseCode(code, ProgramTree);
    const translator = new ProgramTranslator(tree);
    const outputPath = path.resolve(
        path.dirname(inputPath),
        path.basename(inputPath).split(".").slice(0, -1).join(".") + ".ts"
    );
    console.log(inputPath);
    console.log(outputPath);
    fs.writeFileSync(outputPath, translator.translate());
}

run(process.argv.slice(2)[0]);
