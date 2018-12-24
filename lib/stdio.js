"use strict";

const util = require("./util");

module.exports = stdioAssertions;

/**
 * Assertions for the program's stdio
 */
function stdioAssertions (chai) {
  const { assert, Assertion } = chai;

  ["stdout", "stderr", "output"].forEach((stdio) => {

    assert[stdio] = (cli, expected, message) => {
      let assertion = new Assertion(cli);

      if (expected instanceof RegExp) {
        match.call(assertion, expected, message);
      }
      else {
        assertion.to.have[stdio](expected, message);
      }
    };

    Assertion.addChainableMethod(stdio, stdioAssertion, stdioChainingBehavior);

    /**
     * Assets that the program's stdio matches the expected regular expression
     *
     * @param {RegExp} expected
     * @param {string} [message]
     * @this Assertion
     */
    function match (expected, message) {
      let { cli } = util.flags(this, { message });

      this.assert(
        expected.test(cli[stdio]),
        `expected "${cli}" ${stdio} to match #{exp}`,
        `expected "${cli}" ${stdio} not to match #{exp}`,
        expected,
        cli[stdio]
      );
    }

    /**
     * When used in a chain, the object being asserted is changed to the program's stdio,
     * so that further assertions can be performed on it.
     *
     * @this Assertion
     */
    function stdioChainingBehavior () {
      let { cli } = util.flags(this);

      // Make sure the property is valid
      assert.isObject(cli, "Invalid CLI object");

      // Change the object being asserted to the stdio property
      util.flags(this, { cli, object: cli[stdio] });
    }

    /**
     * Asserts that the program's stdio equals the expected string
     *
     * @param {string} expected
     * @param {string} [message]
     * @this Assertion
     */
    function stdioAssertion (expected, message) {
      let { cli, object: actual } = util.flags(this, { message });

      assert.isString(expected, message);

      this.assert(
        actual === expected,
        `expected "${cli}" ${stdio} to equal #{exp}`,
        `expected "${cli}" ${stdio} not to equal #{exp}`,
        expected,
        actual
      );

      // Change the object being asserted back to the CLI object.
      // This allows chains such as `should.have.stdout("foo").and.exitCode(0)`
      util.flags(this, { object: cli });
    }
  });
}
