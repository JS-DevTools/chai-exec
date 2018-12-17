"use strict";

const ezSpawn = require("ez-spawn");

module.exports = chaiExec;

// Also export the ez-spawn sync and async functions
module.exports.sync = ezSpawn.sync;
module.exports.async = ezSpawn.async;

/**
 * Adds the Chai-Exec plug-in to Chai.js
 *
 * @param {object} chai - The ChaiJS module
 * @param {object} utils - ChaiJS utility functions
 */
function chaiExec (chai, utils) {
  require("./exit-code")(chai, utils);
}
