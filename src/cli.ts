#!/usr/bin/env node

import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import * as a from 'awaiting';
import * as chalk from 'chalk';
import { readFile } from '.';

const pkg = require(path.join(__dirname, '..', 'package.json'));
program
  .version(pkg.version)
  .usage(`[fname]`)
  .description('reads [fname] in {json, yaml, ini, toml}, prints JSON to stdout.')
  .parse(process.argv);
readFile(program.args[0]).then(obj => {
  console.log(JSON.stringify(obj, null, 2));
}).catch((err) => {
  console.error(chalk.red(err.message));
  console.error(chalk.red(err.stack));
});
