'use strict';

const format = require('util').format;
const Process = require('../process');

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
   * chaiExec.sync('cmd').should.have.exitCode(0);
   * chaiExec.sync('cmd').should.have.exitCode.that.is.oneOf([1, 2, 3]);
   */
  Assertion.addChainableMethod('exitCode', exitCodeAssertion, exitCodeChainingBehavior);

  /**
   * @example
   * chaiExec.sync('cmd').should.exit.with.code(127);
   * chaiExec.sync('cmd').should.exit.with.code.above(100);
   */
  Assertion.addProperty('exit', () => { /* no-op */ });

  chai.assert.exitCode = (actual, expected, msg) =>
    new Assertion(actual).to.have.exitCode(expected, msg);

  chai.assert.notExitCode = (actual, expected, msg) =>
    new Assertion(actual).not.to.have.exitCode(expected, msg);

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

    new Assertion(actualExitCode, msg).is.a('number');
    new Assertion(expectedExitCode, msg).is.a('number');

    this.assert(
      actualExitCode === expectedExitCode,
      format('expected "%s" to exit with a code of #{exp}, but it exited with #{act}', process.command),
      format('expected "%s" not to exit with a code of #{act}', process.command),
      expectedExitCode,
      actualExitCode
    );

    // Change the subject of the assertion back to the Process object.
    // This allows chains such as `should.have.exitCode(0).and.stdout('ok')`
    flag(this, 'object', process);
  }
}
