"use strict";

const ezSpawn = require("ez-spawn");
const Process = require("ez-spawn/lib/process");

module.exports = chaiExecSync;
module.exports.chaiExecSync = chaiExecSync;
module.exports.chaiExecAsync = chaiExecAsync;

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
  if (typeof command === "object") {
    // Just register the Chai-Exec plugin and exit
    return chaiExecPlugin(...arguments);
  }

  try {
    let process = ezSpawn.sync(...arguments);
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
  if (typeof command === "object") {
    // Just register the Chai-Exec plugin and exit
    return chaiExecPlugin(...arguments);
  }

  return ezSpawn.async(...arguments)
    .then(
      (process) => normalizeResults(process),
      (error) => normalizeResults(error)
    );
}

/**
 * Converts an EZ-Spawn Process or ProcessError into a normalized POJO.
 *
 * @param {object} process - An EZ-Spawn Process or ProcessError
 * @returns {object} - The normalized POJO
 */
function normalizeResults (process) {
  let cli = Object.assign({}, process);
  cli.exitCode = process.status;
  cli.output = process.stdout + process.stderr;
  cli.toString = Process.prototype.toString;
  return cli;
}
