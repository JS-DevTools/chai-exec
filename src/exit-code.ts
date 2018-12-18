import { Process } from "ez-spawn";
import { Chai, ChaiUtil } from "./chai";

/**
 * Assertions for the program's exit code
 */
export function exitCodeAssertions(chai: Chai, util: ChaiUtil) {
  const Assertion = chai.Assertion;

  /**
   * @example
   * assert.exitCode(chaiExec.sync('cmd'), 0);
   */
  chai.assert.exitCode = (process: Process, expected, msg: string) =>
    new Assertion(process).to.have.exitCode(expected, msg);

  /**
   * @example
   * assert.notExitCode(chaiExec.sync('cmd'), 1);
   */
  chai.assert.notExitCode = (process: Process, expected, msg: string) =>
    new Assertion(process).not.to.have.exitCode(expected, msg);

  /**
   * @example
   * assert.exitCodeBetween(chaiExec.sync('cmd'), 0, 2);
   */
  chai.assert.exitCodeBetween = (process: Process, min, max, msg: string) => {
    new Assertion(process).to.have.exitCode.that.is.above(min, msg);
    new Assertion(process).to.have.exitCode.that.is.below(max, msg);
  };

  /**
   * @example
   * assert.exitCodeNotBetween(chaiExec.sync('cmd'), 4, 7);
   */
  chai.assert.exitCodeNotBetween = (process: Process, min, max, msg: string) => {
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
  util.addChainableMethod("exitCode", exitCodeAssertion, exitCodeChainingBehavior);
  util.addChainableMethod("code", exitCodeAssertion, exitCodeChainingBehavior);

  /**
   * @example
   * chaiExec.sync('cmd').should.exit.with.code(127);
   * chaiExec.sync('cmd').should.exit.with.code.above(100);
   */
  util.addProperty("exit", () => { /* no-op */ });

  /**
   * When used in a chain, the subject of the assertion is changed to the exit
   * code, so that further assertions can be performed on it.
   */
  function exitCodeChainingBehavior() {
    // Make sure the subject of the assertion is a Process object
    let process = util.flag(this, "object");
    new Assertion(process).instanceOf(process);

    // Change the subject of the assertion to the exitCode
    util.flag(this, "object", process.exitCode);
    util.flag(this, "process", process);
  }

  /**
   * Asserts that the program's exit code matches the expected value
   *
   * @param {number} expectedExitCode
   * @param {string} [msg]
   */
  function exitCodeAssertion(expectedExitCode, msg) {
    let actualExitCode = util.flag(this, "object");
    let process = util.flag(this, "process");

    // Set or get the message
    if (msg) {
      util.flag(this, "message", msg);
    }
    else {
      msg = util.flag(this, "message");
    }

    // It should be either a Number or a Array
    if (typeof (expectedExitCode) === "number") {
      new Assertion(actualExitCode, msg).is.a("number");
      new Assertion(expectedExitCode, msg).is.a("number");

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
        new Assertion(exitCode, msg).is.a("number");
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
    util.flag(this, "object", process);
  }
}
