"use strict";

const Process = require("@jsdevtools/ez-spawn/lib/process");

module.exports = normalizeResults;

/**
 * Converts an EZ-Spawn Process or ProcessError into a normalized POJO.
 *
 * @param {object} process - An EZ-Spawn Process or ProcessError
 * @returns {object} - The normalized POJO
 */
function normalizeResults (process) {
  // Copy all properties of the Process object
  let cli = Object.assign({}, process);

  // Add Chai-Exec properties
  cli.exitCode = process.status;
  cli.output = process.stdout + process.stderr;

  // Use Process.toString()
  cli.toString = Process.prototype.toString;

  return cli;
}
