Chai Exec
=======================

#### Chai assertions for testing your CLI

[![Cross-Platform Compatibility](https://jsdevtools.org/img/badges/os-badges.svg)](https://travis-ci.com/JS-DevTools/chai-exec)
[![Build Status](https://api.travis-ci.com/JS-DevTools/chai-exec.svg?branch=master)](https://travis-ci.com/JS-DevTools/chai-exec)

[![Coverage Status](https://coveralls.io/repos/github/JS-DevTools/chai-exec/badge.svg?branch=master)](https://coveralls.io/github/JS-DevTools/chai-exec?branch=master)
[![Dependencies](https://david-dm.org/JS-DevTools/chai-exec.svg)](https://david-dm.org/JS-DevTools/chai-exec)

[![npm](https://img.shields.io/npm/v/chai-exec.svg?maxAge=43200)](https://www.npmjs.com/package/chai-exec)
[![License](https://img.shields.io/npm/l/chai-exec.svg?maxAge=2592000)](LICENSE)


Features
--------------------------
- **Easy to use**<br>
  Pass your CLI and arguments as a single string, an array of strings, or as separate parameters.

- **Fluent assertions**<br>
  Test your CLI using intuitive fluent syntax, such as `myCLI.should.exit.with.code(0)` or `myCLI.stdout.should.contain("some string")`.

- **Windows Support**<br>
  Excellent Windows support, thanks to [cross-spawn](https://github.com/moxystudio/node-cross-spawn).


Related Projects
--------------------------
- [ez-spawn](https://github.com/JS-DevTools/ez-spawn) - Simple, consistent process spawning


Examples
--------------------------

```javascript
const chaiExec = require("chai-exec");
const chai = require("chai");
chai.use(chaiExec);

describe("My CLI", () => {
  it("should exit with a zero exit code", () => {
    // Run your CLI
    let myCLI = chaiExec('my-cli --arg1 --arg2 "some other arg"');

    // Should syntax
    myCLI.should.exit.with.code(0);
    myCLI.stdout.should.contain("Success!");
    myCLI.stderr.should.be.empty;

    // Expect sytnax
    expect(myCLI).to.exit.with.code(0);
    expect(myCLI).stdout.to.contain("Success!");
    expect(myCLI).stderr.to.be.empty;

    // Assert syntax
    assert.exitCode(myCLI, 0);
    assert.stdoutIncludes(myCLI, "Success!");
    assert.stderr(myCLI, "");
  });
});
```


Installation
--------------------------
Install using [npm](https://docs.npmjs.com/getting-started/what-is-npm):

```bash
npm install chai-exec
```

Then require it in your test file and register it with Chai:

```javascript
const chaiExec = require("chai-exec");
const chai = require("chai");
chai.use(chaiExec);
```


Contributing
--------------------------
Contributions, enhancements, and bug-fixes are welcome! [File an issue](https://github.com/JS-DevTools/chai-exec/issues) on GitHub and [submit a pull request](https://github.com/JS-DevTools/chai-exec/pulls).

#### Building/Testing
To build/test the project locally on your computer:

1. __Clone this repo__<br>
`git clone hhttps://github.com/JS-DevTools/chai-exec.git`

2. __Install dependencies__<br>
`npm install`

3. __Run the tests__<br>
`npm test`


License
--------------------------
chai-exec is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.


Big Thanks To
--------------------------
Thanks to these awesome companies for their support of Open Source developers ❤

[![Travis CI](https://jsdevtools.org/img/badges/travis-ci.svg)](https://travis-ci.com)
[![SauceLabs](https://jsdevtools.org/img/badges/sauce-labs.svg)](https://saucelabs.com)
[![Coveralls](https://jsdevtools.org/img/badges/coveralls.svg)](https://coveralls.io)
