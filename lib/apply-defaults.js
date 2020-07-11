"use strict";

module.exports = applyDefaults;

/**
 * Applies default values (if any) to the arguments
 */
function applyDefaults (defaults, originalArgs) {
  defaults = defaults || {};

  let command = defaults.command;
  let args = Array.prototype.slice.call(originalArgs);
  let options;

  let lastArg = args[args.length - 1];
  if (lastArg === null || lastArg === undefined ||
  (typeof lastArg === "object" && !Array.isArray(lastArg))) {
    // The last argument is the options object
    options = args.pop();
  }

  if (args.length === 1) {
    if (command) {
      // The args were passed as a single string or an array of strings
      args = args[0];
    }
    else if (typeof args[0] === "string") {
      // The command and args were passed as a single string
      command = args.shift();
    }
    else if (Array.isArray(args[0])) {
      // The command and args were passed as an array
      command = args[0][0];
      args = args[0].slice(1);
    }
  }
  else if (!command) {
    // The first argument is the command
    command = args.shift();
  }

  if (typeof defaults.args === "string") {
    if (typeof args === "string") {
      // Concatenate the two strings
      args = defaults.args + " " + args;
    }
    else if (args.length === 0) {
      args = defaults.args;
    }
    else {
      // Insert the default arg at the beginning of the array
      args.unshift(defaults.args);
    }
  }
  else if (Array.isArray(defaults.args)) {
    // Append the arg(s) to the default args
    args = defaults.args.concat(args);
  }

  if (defaults.options) {
    if (options) {
      // Merge the default options with the options arg
      options = Object.assign({}, defaults.options, options);
    }
    else {
      // Clone the default options
      options = Object.assign({}, defaults.options);
    }
  }

  // By default, use the current process's environment variables.
  // except for NODE environment variables, which could impact how the child process runs.
  options = options || {};
  if (!options.env) {
    options.env = Object.assign({}, process.env, {
      NODE_ENV: "",
      NODE_OPTIONS: "",
    });
  }

  if (typeof args === "string") {
    return [command + " " + args, options];
  }
  else {
    return [command].concat(args, options);
  }
}
