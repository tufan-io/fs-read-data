# fs-read-data

<!-- badge -->
[![npm license](https://img.shields.io/npm/l/fs-read-data.svg)](https://www.npmjs.com/package/fs-read-data)
[![travis status](https://img.shields.io/travis/tufan-io/fs-read-data.svg)](https://travis-ci.org/tufan-io/fs-read-data)
[![Build status](https://ci.appveyor.com/api/projects/status/90am2usst4qeutgi?svg=true)](https://ci.appveyor.com/project/tufan-io/fs-read-data)
[![Coverage Status](https://coveralls.io/repos/github/tufan-io/fs-read-data/badge.svg?branch=master)](https://coveralls.io/github/tufan-io/fs-read-data?branch=master)
[![David](https://david-dm.org/tufan-io/fs-read-data/status.svg)](https://david-dm.org/tufan-io/fs-read-data)
[![David](https://david-dm.org/tufan-io/fs-read-data/dev-status.svg)](https://david-dm.org/tufan-io/fs-read-data?type=dev)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
<br/>
[![NPM](https://nodei.co/npm/fs-read-data.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/fs-read-data/)
<!-- endbadge -->

`fs-read-data` is a simple mechanism to read files in this one of multiple formats {json, js, yaml, ini, toml}.

Provides a CLI and API interface to underlying capability, making conversion of
data-formats a breeze, especially when coupled with [fs-write-data](https://github.com/tufan-io/fs-write-data)

### Why?

It's common to have data files in one of multiple well-known formats (json, yaml, ini, toml).
Sometimes these are config files, sometimes they are just declartive definitions.

This is a tool to help work with such files without getting in your way.

Great for checking validity of hand-crafted data files.

Compared to a single spurious babel module installation, the additional
weight of multiple file parsers was considered acceptable collateral-weight.

## Installation

```bash
npm install fs-read-data
```

```bash
yarn install fs-read-data
```

## Usage

### CLI
```bash

  Usage: read-data [fname]

  reads [fname] in {json, yaml, ini, toml}, prints resulting json to stdout.


  Options:

    -V, --version  output the version number
    -h, --help     output usage information
```

### API

Exposes a single function via the API

```javascript
/**
 * Reads filename in one of the supported formats
 * and returns a promise that resolves to a JavaScript object.
 *
 * @async
 * @param fname file to read
 */
async readFile(fname);
```

```javascript

const read = require('fs-read-data').readFile;

// one of these

// auto-detects available extension, throws on multiple extensions
const data = await read(`/path/to/file/data`);
// read specific extension
const data = await read(`/path/to/file/data.json`);
const data = await read(`/path/to/file/data.yaml`);
const data = await read(`/path/to/file/data.yml`);
const data = await read(`/path/to/file/data.js`); // must return a single object
const data = await read(`/path/to/file/data.ini`);
const data = await read(`/path/to/file/data.toml`);
```

## Development Tooling

- [Development tooling](./docs/DevTools.md)
- [Changelog]('./CHANGELOG.md')

## Related

[fs-write-data](https://github.com/tufan-io/fs-write-data)

### Dependencies

This is an aggregation module, much like [fs-extra](https://npmjs.org/package/fs-extra).
It's built upon the shoulders of libraries that provide it's core functionality.

[js-yaml](https://www.npmjs.com/package/js-yaml)
[ini](https://www.npmjs.com/package/ini)
[toml](https://www.npmjs.com/package/toml)

Support cast:
[awaiting](https://www.npmjs.com/package/awaiting)
[commander](https://www.npmjs.com/package/commander)

## License

[Apache-2.0](LICENSE)

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](code-of-conduct.md). By participating in this project you agree to abide by its terms.

## Support

Bugs, PRs, comments, suggestions welcomed!
