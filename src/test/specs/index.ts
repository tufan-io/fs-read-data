
import { test } from 'ava';
import { readFile } from '../..';
import * as path from 'path';
import * as execa from 'execa';

const pwd = process.cwd();

const fname = (ext) => {
  const p = path.join(pwd, 'src', 'test', 'fixtures', 'data');
  switch (ext) {
    case 'js':
    case 'json':
    case 'yaml':
    case 'yml':
    case 'toml':
    case 'ini':
      return `${p}.${ext}`;
    default:
      return p;
  }
};

const expected = {
  name: 'fs-read-data',
  description: 'make it easy to read files of multiple types'
};

for (let ext of ['json', 'js', 'yml', 'yaml', 'ini', 'toml']) {
  const fname = path.join(process.cwd(), 'src', 'test', 'fixtures', `data.${ext}`);
  test(`fs-read-data ${fname}`, async t => {
    const data = await readFile(fname);
    t.deepEqual(data, expected);
  });
}

test(`fs-read-data auto detect extension`, async t => {
  const fname = path.join(process.cwd(), 'src', 'test', 'fixtures', 'auto-extn', `data`);
  const data = await readFile(fname);
  t.deepEqual(data, expected);
});

test(`fs-read-data no-extn no-file`, async t => {
  const fname = path.join(process.cwd(), 'src', 'test', 'fixtures', `non-existant`);
  const err = await t.throws(readFile(fname));
  t.regex(err.message, /.*NOTFOUND: file not found .*/);
});

test(`fs-read-data no-extn too-many`, async t => {
  const fname = path.join(process.cwd(), 'src', 'test', 'fixtures', `data`);
  const err = await t.throws(readFile(fname));
  t.regex(err.message, /.*MULTIPLE: .* has more than one file named data:.*/);
});

test(`fs-read-data unsupported extn`, async t => {
  const fname = path.join(process.cwd(), 'src', 'test', 'fixtures', `data.xml`);
  const err = await t.throws(readFile(fname));
  t.regex(err.message, /.*unknown file extension.*xml.*/);
});

test(`fs-read-data test cli`, async t => {
  await execa('node', ['build/index.js', 'src/test/fixtures/data.json']).then(result => {
    const expected = [
      '{',
      '  "name": "fs-read-data",',
      '  "description": "make it easy to read files of multiple types"',
      '}'
    ].join('\n');
    // console.log(result);
    t.is(result.stdout, expected);
  });
});

test(`fs-read-data test cli error`, async t => {
  await execa(
    'node', ['build/index.js', 'src/test/fixtures/data'])
    .then(result => {
      t.regex(
        result.stderr,
        /.*MULTIPLE: .* has more than one file named data:.*/
      );
    });
});
