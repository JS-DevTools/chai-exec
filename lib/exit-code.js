"use strict";

module.exports = exitCodeAssertions;

/**
 * Assertions for the program's exit code
 */
function exitCodeAssertions (chai, util) {
  const Assertion = chai.Assertion;
  const { flag } = util;

  chai.assert.exitCode = (cli, expected, msg) => {
    if (Array.isArray(expected)) {
      new Assertion(cli).to.exit.with.a.code.that.is.oneOf(expected, msg);
    }
    else {
      new Assertion(cli).to.exit.with(expected, msg);
    }
  };

  chai.assert.notExitCode = (cli, expected, msg) => {
    if (Array.isArray(expected)) {
      new Assertion(cli).to.exit.with.a.code.that.is.not.oneOf(expected, msg);
    }
    else {
      new Assertion(cli).to.not.exit.with(expected, msg);
    }
  };

  chai.assert.exitCodeBetween = (cli, min, max, msg) => {
    new Assertion(cli).to.have.exitCode.that.is.at.least(min, msg)
      .and.at.most(max, msg);
  };

  chai.assert.exitCodeNotBetween = (cli, min, max, msg) => {
    if (cli.exitCode === min) {
      new Assertion(cli).to.have.exitCode.that.is.below(min, msg);
    }
    else if (cli.exitCode > min) {
      new Assertion(cli).to.have.exitCode.that.is.above(max, msg);
    }
  };

  Assertion.addProperty("exit");
  // Assertion.overwriteChainableMethod("with", exitCodeAssertion, exitCodeChainingBehavior);
  Assertion.addChainableMethod("code", exitCodeAssertion, exitCodeChainingBehavior);
  Assertion.addChainableMethod("exitCode", exitCodeAssertion, exitCodeChainingBehavior);

  /**
   * When used in a chain, the subject of the assertion is changed to the exit
   * code, so that further assertions can be performed on it.
   */
  function exitCodeChainingBehavior () {
    // Make sure the subject of the assertion is a CLI object
    let cli = flag(this, "object");
    new Assertion(cli).instanceOf(cli);

    // Change the subject of the assertion to the exitCode
    flag(this, "object", cli.exitCode);
    flag(this, "cli", cli);
  }

  /**
   * Asserts that the program's exit code matches the expected value
   *
   * @param {number} expectedExitCode
   * @param {string} [msg]
   */
  function exitCodeAssertion (expectedExitCode, msg) {
    let actualExitCode = flag(this, "object");
    let cli = flag(this, "cli");

    // Set or get the message
    if (msg) {
      flag(this, "message", msg);
    }
    else {
      msg = flag(this, "message");
    }

    // It should be either a Number or a Array
    if (typeof (expectedExitCode) === "number") {
      new Assertion(actualExitCode, msg).is.a("number");
      new Assertion(expectedExitCode, msg).is.a("number");

      this.assert(
        actualExitCode === expectedExitCode,
        `expected "${cli}" to exit with a code of #{exp}, but it exited with #{act}`,
        `expected "${cli}" not to exit with a code of #{act}`,
        expectedExitCode,
        actualExitCode
      );
    }
    // If expectedExitCode is an Array then check each item against the actual exit code
    else {
      let exitCodeFound = false;
      for (let exitCode of expectedExitCode) {
        new Assertion(exitCode, msg).is.a("number");
        if (exitCode === actualExitCode) {
          exitCodeFound = true;
        }
      }

      this.assert(
        exitCodeFound,
        `expected "${cli}" to exit with one of #{exp}, but it exited with #{act}`,
        `expected "${cli}" to not exit with one of #{exp}, but it exited with #{act}`,
        expectedExitCode,
        actualExitCode
      );
    }

    // Change the subject of the assertion back to the CLI object.
    // This allows chains such as `should.have.exitCode(0).and.stdout('ok')`
    flag(this, "object", cli);
  }
}
