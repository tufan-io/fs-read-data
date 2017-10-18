
import * as engchk from 'runtime-engine-check';
engchk(); // checks node version matches spec in package.json

import * as yaml from 'js-yaml';
import * as toml from 'toml';
import * as ini from 'ini';
import * as fs from 'fs';
import * as path from 'path';
import * as a from 'awaiting';

const getFileWithExt = async (fname) => {
  const p = path.parse(fname);
  const base = path.join(p.dir, p.base);
  if (p.ext === '') {
    const flist = (await a.callback(fs.readdir, p.dir)).filter(f => f.match(p.name));
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
  } else {
    return { filename: fname, ext: p.ext.replace(/^\./, '') };
  }
};

const content = async fname => a.callback(fs.readFile, fname, 'utf8');

/**
 * Reads filename in one of the supported formats
 * and returns a promise that resolves to a JavaScript object.
 *
 * @async
 * @param fname file to read
 */
export const readFile = async (fname) => {
  const { filename, ext } = await getFileWithExt(fname);
  switch (ext) {
    case 'json': return JSON.parse(await content(filename));
    case 'yaml':
    case 'yml': return yaml.safeLoad(await content(filename));
    case 'ini': return ini.parse(await content(filename));
    case 'toml': return toml.parse(await content(filename));
    case 'js': return require(filename);
    default: throw new Error(`unknown file extension ${filename} ${ext}`);
  }
};

