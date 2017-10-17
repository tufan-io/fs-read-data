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

It even works from the CLI, a great way to test that a hand-crafted
data file is upto snuff.

It's common to have data files in one of multiple well-known formats (json, yaml, ini, toml).
Sometimes these are config files, sometimes they are just declartive definitions.

Compared to a single spurious babel module installation, the additional
weight of multiple file parsers was considered acceptable  collateral-weight.

## Installation

```bash
npm install fs-read-data
```

```bash
yarn install fs-read-data
```

## Usage

```javascript

const reader = require('fs-read-data');

// one of these
const data = reader(`/path/to/file/data`); // auto-detects available extension. Error if multiple found
const data = reader(`/path/to/file/data.json`);
const data = reader(`/path/to/file/data.yaml`);
const data = reader(`/path/to/file/data.yml`);
const data = reader(`/path/to/file/data.js`); // must return a single object
const data = reader(`/path/to/file/data.ini`);
const data = reader(`/path/to/file/data.toml`);
```

## Development Tooling

Described [here](./docs/DevTools.md)

## Related

[fs-write-data](https://github.com/tufan-io/fs-write-data)

## License

[Apache-2.0](LICENSE)

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](code-of-conduct.md). By participating in this project you agree to abide by its terms.

## Support

Bugs, PRs, comments, suggestions welcomed!
