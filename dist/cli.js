#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const path = require("path");
const chalk_1 = require("chalk");
const _1 = require(".");
const pkg = require(path.join(__dirname, '..', 'package.json'));
program
    .version(pkg.version)
    .usage(`[fname]`)
    .description('reads [fname] in {json, yaml, ini, toml}, prints JSON to stdout.')
    .parse(process.argv);
_1.readFile(program.args[0]).then(obj => {
    console.log(JSON.stringify(obj, null, 2));
}).catch((err) => {
    console.error(chalk_1.default.red(err.message));
    console.error(chalk_1.default.red(err.stack));
});
