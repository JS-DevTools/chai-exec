"use strict";

const ezSpawn = require("@jsdevtools/ez-spawn");
const applyDefaults = require("./apply-defaults");
const normalizeResults = require("./normalize-results");

module.exports = chaiExecSync;
module.exports.chaiExecSync = chaiExecSync;
module.exports.chaiExecAsync = chaiExecAsync;

chaiExecSync.defaults = {};
chaiExecAsync.defaults = {};

/**
 * The Chai-Exec plugin
 *
 * @param {object} chai - The ChaiJS module
 * @param {object} util - ChaiJS utility functions
 */
function chaiExecPlugin (chai, util) {
  // Add each of the Chai-Exec sub-modules to Chai
  require("./exit-code")(chai, util);
  require("./stdio")(chai, util);
}

/**
 * Synchronously executes the specified CLI and returns the results
 *
 * @param {string|string[]} command - The command to execute
 * @param {string[]} [args] - Command-line arguments to pass to the command
 * @param {object} [options] - EZ-Spawn options
 * @returns {object} - An EZ-Spawn Process object, or a ProcessError object
 */
function chaiExecSync (command, args, options) {  // eslint-disable-line no-unused-vars
  if (isChai(command)) {
    // Just register the Chai-Exec plugin and exit
    return chaiExecPlugin(...arguments);
  }

  try {
    args = applyDefaults(chaiExecSync.defaults, arguments);
    let process = ezSpawn.sync(...args);
    return normalizeResults(process);
  }
  catch (error) {
    return normalizeResults(error);
  }
}

/**
 * Asynchronously executes the specified CLI and returns the results via a Promise
 *
 * @param {string|string[]} command - The command to execute
 * @param {string[]} [args] - Command-line arguments to pass to the command
 * @param {object} [options] - EZ-Spawn options
 * @returns {Promise} - A Promise that resolves with an EZ-Spawn Process object, or a ProcessError object
 */
function chaiExecAsync (command, args, options) {  // eslint-disable-line no-unused-vars
  if (isChai(command)) {
    // Just register the Chai-Exec plugin and exit
    return chaiExecPlugin(...arguments);
  }

  args = applyDefaults(chaiExecAsync.defaults, arguments);
  return ezSpawn.async(...args)
    .then(
      (process) => normalizeResults(process),
      (error) => normalizeResults(error)
    );
}

/**
 * Determines whether the given value is the ChaiJS module
 */
function isChai (chai) {
  return chai &&
    typeof chai === "object" &&
    typeof chai.assert === "function" &&
    typeof chai.expect === "function" &&
    typeof chai.should === "function";
}
