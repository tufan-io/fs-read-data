
import test from "ava";
import * as execa from "execa";
import * as path from "path";
import { readFile } from "../..";

for (const ext of ["json", "js", "yml", "yaml", "ini", "toml"]) {
  const fname = path.join(process.cwd(), "src", "test", "fixtures", `data.${ext}`);
  test(`fs-read-data API read data.${ext}`, async (t) => {
    const data = await readFile(fname);
    t.snapshot(data);
  });
}

test(`fs-read-data API auto detect extension`, async (t) => {
  const fname = path.join(process.cwd(), "src", "test", "fixtures", "auto-extn", `data`);
  const data = await readFile(fname);
  t.snapshot(data);
});

test(`fs-read-data API no-extn no-file`, async (t) => {
  const fname = path.join(process.cwd(), "src", "test", "fixtures", `non-existant`);
  const err = await t.throwsAsync(readFile(fname));
  t.regex(err.message, /.*NOTFOUND: file not found .*/);
});

test(`fs-read-data API throws when no-extn too-many`, async (t) => {
  const fname = path.join(process.cwd(), "src", "test", "fixtures", `data`);
  const err = await t.throwsAsync(readFile(fname));
  t.regex(err.message, /.*MULTIPLE: .* has more than one file named data:.*/);
});

test(`fs-read-data API throws when unsupported extn`, async (t) => {
  const fname = path.join(process.cwd(), "src", "test", "fixtures", `data.xml`);
  const err = await t.throwsAsync(readFile(fname));
  t.regex(err.message, /.*unknown file extension.*xml.*/);
});

test(`fs-read-data CLI`, async (t) => {
  const result = await execa(
    "node",
    [
      "dist/cli.js",
      "src/test/fixtures/data.json",
    ]);
  t.snapshot(result.stdout);
});

test(`fs-read-data CLI error is handled`, async (t) => {
  const result = await execa(
    "node",
    [
      "dist/cli.js",
      "src/test/fixtures/data",
    ]);
  t.regex(
    result.stderr,
    /.*MULTIPLE: .* has more than one file named data:.*/,
  );
});
