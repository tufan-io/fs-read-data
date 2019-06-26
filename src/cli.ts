#!/usr/bin/env node

import chalk from "chalk";
import * as program from "commander";
import * as path from "path";
import { readFile } from ".";

// tslint:disable-next-line:tsr-detect-non-literal-require no-var-requires
const pkg = require(path.join(__dirname, "..", "package.json"));
program
  .version(pkg.version)
  .usage(`[fname]`)
  .description("reads [fname] in {json, yaml, ini, toml}, prints JSON to stdout.")
  .parse(process.argv);
readFile(program.args[0]).then((obj) => {
  // tslint:disable:no-console
  console.log(JSON.stringify(obj, null, 2));
}).catch((err) => {
  console.error(chalk.red(err.message));
  console.error(chalk.red(err.stack));
});
