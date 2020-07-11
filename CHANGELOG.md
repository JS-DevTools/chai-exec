Change Log
====================================================================================================
All notable changes will be documented in this file.
Chai Exec adheres to [Semantic Versioning](http://semver.org/).



[v2.1.0](https://github.com/JS-DevTools/chai-exec/tree/v2.1.0) (2020-07-11)
----------------------------------------------------------------------------------------------------

- If the `env` option is not set, then it defaults to `process.env`, _except_ for Node.js environment
  variables, such as `NODE_ENV` and `NODE_OPTIONS`. Since Chai Exec is mostly used to test Node.js CLIs,
  this ensures that these environment variables don't unexpectedly affect the spawned CLI process.


[Full Changelog](https://github.com/JS-DevTools/chai-exec/compare/v2.0.4...v2.1.0)



[v2.0.0](https://github.com/JS-DevTools/chai-exec/tree/v2.0.0) (2020-03-04)
----------------------------------------------------------------------------------------------------

- Moved Chai Exec to the [@JSDevTools scope](https://www.npmjs.com/org/jsdevtools) on NPM

- The "chai-exec" NPM package is now just a wrapper around the scoped "@jsdevtools/chai-exec" package


[Full Changelog](https://github.com/JS-DevTools/chai-exec/compare/v1.1.2...v2.0.0)



[v1.1.0](https://github.com/JS-DevTools/chai-exec/tree/v1.1.0) (2018-12-23)
----------------------------------------------------------------------------------------------------

- Added a [`chaiExec.defaults`](README.md#chaiexecdefaults) property, which can reduce repetition in your tests by only setting the `command`, `args`, and/or `options` _once_.

[Full Changelog](https://github.com/JS-DevTools/chai-exec/compare/v1.0.0...v1.1.0)
