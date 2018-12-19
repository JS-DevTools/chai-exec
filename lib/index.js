"use strict";

const ezSpawn = require("ez-spawn");

module.exports = chaiExec;
module.exports.chaiExec = chaiExec;
module.exports.chaiExecSync = chaiExecSync;
module.exports.chaiExecAsync = chaiExecAsync;

/**
 * The Chai-Exec plugin
 *
 * @param {object} chai - The ChaiJS module
 * @param {object} util - ChaiJS utility functions
 */
function chaiExec (chai, util) {
  if (typeof chai === "string" || Array.isArray(chai)) {
    // This is a pass-through to chaiExecSync
    return chaiExecSync(...arguments);
  }

  // Add each of the Chai-Exec sub-modules to Chai
  require("exit-code")(chai, util);
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
  try {
    return ezSpawn.sync.apply(ezSpawn, ...arguments);
  }
  catch (error) {
    return error;
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
  return ezSpawn.async.apply(ezSpawn, ...arguments).catch((error) => Promise.resolve(error));
}
