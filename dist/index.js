"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const engchk = require("runtime-engine-check");
engchk();
const yaml = require("js-yaml");
const toml = require("toml");
const ini = require("ini");
const fs = require("fs");
const path = require("path");
const a = require("awaiting");
const program = require("commander");
const getFileWithExt = (fname) => __awaiter(this, void 0, void 0, function* () {
    const p = path.parse(fname);
    const base = path.join(p.dir, p.base);
    if (p.ext === '') {
        const flist = (yield a.callback(fs.readdir, p.dir)).filter(f => f.match(p.name));
        switch (flist.length) {
            case 1: {
                const q = path.parse(flist[0]);
                return {
                    filename: path.join(p.dir, flist[0]),
                    ext: q.ext.replace(/^\./, '')
                };
            }
            case 0:
                throw new Error(`NOTFOUND: file not found ${fname}`);
            default:
                throw new Error(`MULTIPLE: ${p.dir} has more than one file named ${p.name}: ${JSON.stringify(flist)}`);
        }
    }
    else {
        return { filename: fname, ext: p.ext.replace(/^\./, '') };
    }
});
const content = (fname) => __awaiter(this, void 0, void 0, function* () { return a.callback(fs.readFile, fname, 'utf8'); });
exports.readFile = (fname) => __awaiter(this, void 0, void 0, function* () {
    const { filename, ext } = yield getFileWithExt(fname);
    switch (ext) {
        case 'json': return JSON.parse(yield content(filename));
        case 'yaml':
        case 'yml': return yaml.safeLoad(yield content(filename));
        case 'ini': return ini.parse(yield content(filename));
        case 'toml': return toml.parse(yield content(filename));
        case 'js': return require(filename);
        default: throw new Error(`unknown file extension ${filename} ${ext}`);
    }
});
if (require.main === module) {
    const pkg = require(path.join(__dirname, '..', 'package.json'));
    program
        .version(pkg.version)
        .usage(`[fname]`)
        .description('reads [fname] in {json, yaml, ini, toml}, prints resulting Object to stdout.')
        .parse(process.argv);
    exports.readFile(program.args[0]).then(obj => {
        console.log(JSON.stringify(obj, null, 2));
    }).catch((err) => {
        console.error(err.message);
        console.error(err.stack);
    });
}
