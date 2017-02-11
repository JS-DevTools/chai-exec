'use strict';

const Process = require('ez-spawn').Process;

module.exports = exitCodeAssertions;

/**
 * Assertions for the program's exit code
 *
 * @param {object} chai - The ChaiJS module
 * @param {object} utils - ChaiJS utility functions
 */
function exitCodeAssertions (chai, utils) {
  const Assertion = chai.Assertion;
  const flag = utils.flag;

  /**
   * @example
   * assert.exitCode(chaiExec.sync('cmd'), 0);
   */
  chai.assert.exitCode = (process, expected, msg) =>
    new Assertion(process).to.have.exitCode(expected, msg);

  /**
   * @example
   * assert.notExitCode(chaiExec.sync('cmd'), 1);
   */
  chai.assert.notExitCode = (process, expected, msg) =>
    new Assertion(process).not.to.have.exitCode(expected, msg);

  /**
   * @example
   * assert.exitCodeBetween(chaiExec.sync('cmd'), 0, 2);
   */
  chai.assert.exitCodeBetween = (process, min, max, msg) => {
    new Assertion(process).to.have.exitCode.that.is.above(min, msg);
    new Assertion(process).to.have.exitCode.that.is.below(max, msg);
  };

  /**
   * @example
   * assert.exitCodeNotBetween(chaiExec.sync('cmd'), 4, 7);
   */
  chai.assert.exitCodeNotBetween = (process, min, max, msg) => {
    let exitCode = process.exitCode;

    if (exitCode > max) {
      new Assertion(process).to.have.exitCode.that.is.above(max, msg);
    }
    else {
      new Assertion(process).to.have.exitCode.that.is.below(min, msg);
    }

  };

  /**
   * @example
   * chaiExec.sync('cmd').should.have.exitCode(0);
   * chaiExec.sync('cmd').should.have.exitCode.that.is.oneOf([1, 2, 3]);
   * chaiExec.sync('cmd').should.have.code.that.is.above(100);
   */
  Assertion.addChainableMethod('exitCode', exitCodeAssertion, exitCodeChainingBehavior);
  Assertion.addChainableMethod('code', exitCodeAssertion, exitCodeChainingBehavior);

  /**
   * @example
   * chaiExec.sync('cmd').should.exit.with.code(127);
   * chaiExec.sync('cmd').should.exit.with.code.above(100);
   */
  Assertion.addProperty('exit', () => { /* no-op */ });

  /**
   * When used in a chain, the subject of the assertion is changed to the exit
   * code, so that further assertions can be performed on it.
   */
  function exitCodeChainingBehavior () {
    // Make sure the subject of the assertion is a Process object
    let process = flag(this, 'object');
    new Assertion(process).instanceOf(Process);

    // Change the subject of the assertion to the exitCode
    flag(this, 'object', process.exitCode);
    flag(this, 'process', process);
  }

  /**
   * Asserts that the program's exit code matches the expected value
   *
   * @param {number} expectedExitCode
   * @param {string} [msg]
   */
  function exitCodeAssertion (expectedExitCode, msg) {
    let actualExitCode = flag(this, 'object');
    let process = flag(this, 'process');

    // Set or get the message
    if (msg) {
      flag(this, 'message', msg);
    }
    else {
      msg = flag(this, 'message');
    }

    // It should be either a Number or a Array
    if (typeof (expectedExitCode) === 'number') {
      new Assertion(actualExitCode, msg).is.a('number');
      new Assertion(expectedExitCode, msg).is.a('number');

      this.assert(
        actualExitCode === expectedExitCode,
        `expected "${process}" to exit with a code of #{exp}, but it exited with #{act}`,
        `expected "${process}" not to exit with a code of #{act}`,
        expectedExitCode,
        actualExitCode
      );
    }
    // If expectedExitCode is an Array then check each item against the actual exit code
    else {
      let exitCodeFound = false;
      for (let exitCode of expectedExitCode) {
        new Assertion(exitCode, msg).is.a('number');
        if (exitCode === actualExitCode) {
          exitCodeFound = true;
        }
      }

      this.assert(
        exitCodeFound,
        `expected "${process}" to exit with one of #{exp}, but it exited with #{act}`,
        `expected "${process}" to not exit with one of #{exp}, but it exited with #{act}`,
        expectedExitCode,
        actualExitCode
      );
    }

    // Change the subject of the assertion back to the Process object.
    // This allows chains such as `should.have.exitCode(0).and.stdout('ok')`
    flag(this, 'object', process);
  }
}
