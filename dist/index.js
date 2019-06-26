"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engchk = require("runtime-engine-check");
engchk();
const a = require("awaiting");
const fs = require("fs");
const ini = require("ini");
const yaml = require("js-yaml");
const path = require("path");
const toml = require("toml");
const getFileWithExt = async (fname) => {
    const p = path.parse(fname);
    if (p.ext === "") {
        const flist = (await a.callback(fs.readdir, p.dir)).filter((f) => f.match(p.name));
        switch (flist.length) {
            case 1: {
                const q = path.parse(flist[0]);
                return {
                    ext: q.ext.replace(/^\./, ""),
                    filename: path.join(p.dir, flist[0]),
                };
            }
            case 0:
                throw new Error(`NOTFOUND: file not found ${fname}`);
            default:
                throw new Error(`MULTIPLE: ${p.dir} has more than one file named ${p.name}: ${JSON.stringify(flist)}`);
        }
    }
    else {
        return { filename: fname, ext: p.ext.replace(/^\./, "") };
    }
};
const content = async (fname) => a.callback(fs.readFile, fname, "utf8");
exports.readFile = async (fname) => {
    const { filename, ext } = await getFileWithExt(fname);
    switch (ext) {
        case "json": return JSON.parse(await content(filename));
        case "yaml":
        case "yml": return yaml.safeLoad(await content(filename));
        case "ini": return ini.parse(await content(filename));
        case "toml": return toml.parse(await content(filename));
        case "js": return require(filename);
        default: throw new Error(`unknown file extension ${filename} ${ext}`);
    }
};
//# sourceMappingURL=index.js.map