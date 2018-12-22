"use strict";

const chaiExec = require("../../");
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiExec);
chai.should();

describe("output", () => {
  let noOutput = chaiExec("test/fixtures/bin/echo-args");
  let hasOutput = chaiExec("test/fixtures/bin/echo-args --foo --bar");
  let errorOutput = chaiExec("test/fixtures/bin/exit-code 1");

  describe("successful assertions", () => {
    it("should test output equality", () => {
      // Expect syntax
      expect(noOutput.output).to.equal("");
      expect(errorOutput).output.to.equal("Process was exited with code 1\n");
      expect(hasOutput).to.have.output("Argument #1: --foo\nArgument #2: --bar\n");

      // Should syntax
      noOutput.output.should.equal("");
      errorOutput.output.should.equal("Process was exited with code 1\n");
      hasOutput.should.have.output("Argument #1: --foo\nArgument #2: --bar\n");

      // Assert syntax
      assert.output(noOutput, "");
      assert.output(errorOutput, "Process was exited with code 1\n");
      assert.output(hasOutput, "Argument #1: --foo\nArgument #2: --bar\n");
    });

    it("should test output inequality", () => {
      // Expect syntax
      expect(noOutput.output).not.to.equal("anything");
      expect(errorOutput).output.not.to.equal("anything else");
      expect(hasOutput).not.to.have.output("anything else");

      // Should syntax
      noOutput.output.should.not.equal("anything");
      errorOutput.output.should.not.equal("anything else");
      hasOutput.should.not.have.output("anything else");

      // Assert syntax
      assert.notEqual(noOutput.output, "anything");
      assert.notEqual(errorOutput.output, "anything else");
      assert.notEqual(hasOutput.output, "anything else");
    });

    it("should test output RegExp pattern", () => {
      // Expect syntax
      expect(noOutput.output).to.match(/^$/);
      expect(errorOutput).output.to.match(/^Process was exited with code \d/);
      expect(hasOutput).to.have.output.that.matches(/Argument #\d: --\w+/);

      // Should syntax
      noOutput.output.should.match(/^$/);
      errorOutput.output.should.match(/^Process was exited with code \d/);
      hasOutput.should.have.output.that.matches(/Argument #\d: --\w+/);

      // Assert syntax
      assert.output(noOutput, /^$/);
      assert.output(errorOutput, /^Process was exited with code \d/);
      assert.output(hasOutput, /Argument #\d: --\w+/);
    });

    it("should be chainable with other assertions", () => {
      // Expect syntax
      expect(noOutput).output.to.equal("").and.exitCode(0);
      expect(errorOutput).output.to.equal("Process was exited with code 1\n").and.exit.code.to.not.equal(0);
      expect(hasOutput).to.have.output("Argument #1: --foo\nArgument #2: --bar\n").and.exit.code(0);

      // Should syntax
      noOutput.should.have.output.with.lengthOf(0).and.exitCode(0);
      errorOutput.should.have.output.that.equals("Process was exited with code 1\n").and.exit.code.should.not.equal(0);
      hasOutput.should.have.output("Argument #1: --foo\nArgument #2: --bar\n").and.exit.code(0);
    });
  });

  describe("failed assertions", () => {

    it("should test output equality", () => {
      // Expect syntax
      (() => {
        expect(noOutput).to.have.output("something");
      }).should.throw('expected "test/fixtures/bin/echo-args" output to equal \'something\'');

      (() => {
        expect(errorOutput).to.have.output("something else", "my custom message");
      }).should.throw("my custom message");

      (() => {
        expect(hasOutput).to.have.output("something else");
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" output to equal \'something else\'');

      // Should syntax
      (() => {
        noOutput.should.have.output("something");
      }).should.throw('expected "test/fixtures/bin/echo-args" output to equal \'something\'');

      (() => {
        errorOutput.should.have.output("something else", "my custom message");
      }).should.throw("my custom message");

      (() => {
        hasOutput.should.have.output("something else");
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" output to equal \'something else\'');

      // Assert syntax
      (() => {
        assert.output(noOutput, "something");
      }).should.throw('expected "test/fixtures/bin/echo-args" output to equal \'something\'');

      (() => {
        assert.output(errorOutput, "something else", "my custom message");
      }).should.throw("my custom message");

      (() => {
        assert.output(hasOutput, "something else");
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" output to equal \'something else\'');
    });

    it("should test output inequality", () => {
      // Expect syntax
      (() => {
        expect(noOutput).not.to.have.output("");
      }).should.throw('expected "test/fixtures/bin/echo-args" output not to equal \'\'');

      (() => {
        expect(errorOutput).not.to.have.output("Process was exited with code 1\n", "my custom message");
      }).should.throw("my custom message");

      (() => {
        expect(hasOutput).not.to.have.output("Argument #1: --foo\nArgument #2: --bar\n");
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" output not to equal \'Argument #1: --foo\\nArgument #2: --bar\\n\'');

      // Should syntax
      (() => {
        noOutput.should.not.have.output("");
      }).should.throw('expected "test/fixtures/bin/echo-args" output not to equal \'\'');

      (() => {
        errorOutput.should.not.have.output("Process was exited with code 1\n", "my custom message");
      }).should.throw("my custom message");

      (() => {
        hasOutput.should.not.have.output("Argument #1: --foo\nArgument #2: --bar\n");
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" output not to equal \'Argument #1: --foo\\nArgument #2: --bar\\n\'');
    });

    it("should test output RegExp pattern", () => {
      (() => {
        assert.output(noOutput, /^something$/);
      }).should.throw('expected "test/fixtures/bin/echo-args" output to match /^something$/');

      (() => {
        assert.output(errorOutput, /^something else$/, "my custom message");
      }).should.throw("my custom message");

      (() => {
        assert.output(hasOutput, /^something else$/);
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" output to match /^something else$/');
    });

  });
});
