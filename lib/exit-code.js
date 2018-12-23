"use strict";

const util = require("./util");

module.exports = exitCodeAssertions;

/**
 * Assertions for the program's exit code
 */
function exitCodeAssertions (chai) {
  const { assert, Assertion } = chai;

  assert.exitCode = (cli, expected, message) => {
    let assertion = new Assertion(cli);

    if (Array.isArray(expected)) {
      oneOf.call(assertion, expected, message);
    }
    else {
      assertion.to.exit.with.code(expected, message);
    }
  };

  assert.notExitCode = (cli, expected, message) => {
    let assertion = new Assertion(cli);

    if (Array.isArray(expected)) {
      oneOf.call(assertion.not, expected, message);
    }
    else {
      assertion.to.not.exit.with.code(expected, message);
    }
  };

  assert.exitCodeBetween = (cli, min, max, message) => {
    between.call(new Assertion(cli), min, max, message);
  };

  assert.exitCodeNotBetween = (cli, min, max, message) => {
    between.call(new Assertion(cli).not, min, max, message);
  };

  Assertion.addProperty("exit");
  Assertion.addChainableMethod("code", exitCodeAssertion, exitCodeChainingBehavior);
  Assertion.addChainableMethod("status", exitCodeAssertion, exitCodeChainingBehavior);
  Assertion.addChainableMethod("exitCode", exitCodeAssertion, exitCodeChainingBehavior);

  /**
   * Assets that the program's exit code matches one of the expected values
   *
   * @param {number} expectedExitCode
   * @param {string} [message]
   * @this Assertion
   */
  function oneOf (expectedExitCodes, message) {
    let { cli } = util.flags(this, { message });

    this.assert(
      expectedExitCodes.includes(cli.exitCode),
      `expected "${cli}" to exit with one of #{exp}, but it exited with #{act}`,
      `expected "${cli}" to not exit with one of #{exp}, but it exited with #{act}`,
      expectedExitCodes,
      cli.exitCode
    );
  }

  /**
   * Assets that the program's exit code is in the specified range (inclusive)
   *
   * @param {number} min
   * @param {number} max
   * @param {string} [message]
   * @this Assertion
   */
  function between (min, max, message) {
    let { cli } = util.flags(this, { message });

    this.assert(
      cli.exitCode >= min && cli.exitCode <= max,
      `expected "${cli}" to exit with a code between ${min} and ${max}, but it exited with ${cli.exitCode}`,
      `expected "${cli}" to exit with a code that's not between ${min} and ${max}, but it exited with ${cli.exitCode}`,
      { min, max },
      cli.exitCode
    );
  }

  /**
   * When used in a chain, the object being asserted is changed to the exit code,
   * so that further assertions can be performed on it.
   *
   * @this Assertion
   */
  function exitCodeChainingBehavior () {
    let { cli } = util.flags(this);

    // Make sure the "exitCode" property is valid
    assert.isObject(cli, "Invalid CLI object");

    // Change the object being asserted to the exitCode
    util.flags(this, { cli, object: cli.exitCode });
  }

  /**
   * Asserts that the program's exit code matches the expected value
   *
   * @param {number} expectedExitCode
   * @param {string} [message]
   * @this Assertion
   */
  function exitCodeAssertion (expectedExitCode, message) {
    let { cli, object: actualExitCode } = util.flags(this, { message });

    assert.isNumber(expectedExitCode, message);

    this.assert(
      actualExitCode === expectedExitCode,
      `expected "${cli}" to exit with a code of #{exp}, but it exited with #{act}`,
      `expected "${cli}" not to exit with a code of #{act}`,
      expectedExitCode,
      actualExitCode
    );

    // Change the object being asserted back to the CLI object.
    // This allows chains such as `should.have.exitCode(0).and.stdout('ok')`
    util.flags(this, { object: cli });
  }
}
