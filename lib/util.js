"use strict";

const chai = require("chai");
const flag = chai.util.flag;

const util = module.exports = {
  /**
   * Determines whether the given value is a CLI object
   */
  isCLI (cli) {
    return cli &&
      typeof cli === "object" &&
      typeof cli.command === "string" &&
      Array.isArray(cli.args);
  },

  /**
   * Sets multiple assertion flags at once, and returns commonly-used flags
   *
   * @param {chai.Assertion} assertion - The Assertion to get/set flags for
   * @param {object} [flags] - A map of flag names and values to set
   * @returns {object} - A map of flag names and values, including commonly-used flags
   */
  flags (assertion, flags = {}) {
    // Set all the flags
    for (let key of Object.keys(flags)) {
      flag(assertion, key, flags[key]);
    }

    // Always return these flags
    flags.object = flags.object || flag(assertion, "object");
    flags.cli = flags.cli || flag(assertion, "cli");
    flags.message = flags.message || flag(assertion, "message");

    // If the "cli" flag isn't set, and the "object" flag is a CLI object,
    // then go ahead and set the "cli" flag
    if (!flags.cli && util.isCLI(flags.object)) {
      flag(assertion, "cli", flags.object);
      flags.cli = flags.object;
    }

    return flags;
  },
};
