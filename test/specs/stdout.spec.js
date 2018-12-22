"use strict";

const chaiExec = require("../../");
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiExec);
chai.should();

describe("stdout", () => {
  let noOutput = chaiExec("test/fixtures/bin/echo-args");
  let hasOutput = chaiExec("test/fixtures/bin/echo-args --foo --bar");
  let errorOutput = chaiExec("test/fixtures/bin/exit-code 1");

  describe("successful assertions", () => {
    it("should test stdout equality", () => {
      // Expect syntax
      expect(noOutput.stdout).to.equal("");
      expect(errorOutput).stdout.to.equal("");
      expect(hasOutput).to.have.stdout("Argument #1: --foo\nArgument #2: --bar\n");

      // Should syntax
      noOutput.stdout.should.equal("");
      errorOutput.stdout.should.equal("");
      hasOutput.should.have.stdout("Argument #1: --foo\nArgument #2: --bar\n");

      // Assert syntax
      assert.stdout(noOutput, "");
      assert.stdout(errorOutput, "");
      assert.stdout(hasOutput, "Argument #1: --foo\nArgument #2: --bar\n");
    });

    it("should test stdout inequality", () => {
      // Expect syntax
      expect(noOutput.stdout).not.to.equal("anything");
      expect(errorOutput).stdout.not.to.equal("anything");
      expect(hasOutput).not.to.have.stdout("anything else");

      // Should syntax
      noOutput.stdout.should.not.equal("anything");
      errorOutput.stdout.should.not.equal("anything");
      hasOutput.should.not.have.stdout("anything else");

      // Assert syntax
      assert.notEqual(noOutput.stdout, "anything");
      assert.notEqual(errorOutput.stdout, "anything");
      assert.notEqual(hasOutput.stdout, "anything else");
    });

    it("should test stdout RegExp pattern", () => {
      // Expect syntax
      expect(noOutput.stdout).to.match(/^$/);
      expect(errorOutput).stdout.to.match(/^$/);
      expect(hasOutput).to.have.stdout.that.matches(/Argument #\d: --\w+/);

      // Should syntax
      noOutput.stdout.should.match(/^$/);
      errorOutput.stdout.should.match(/^$/);
      hasOutput.should.have.stdout.that.matches(/Argument #\d: --\w+/);

      // Assert syntax
      assert.stdout(noOutput, /^$/);
      assert.stdout(errorOutput, /^$/);
      assert.stdout(hasOutput, /Argument #\d: --\w+/);
    });

    it("should be chainable with other assertions", () => {
      // Expect syntax
      expect(noOutput).stdout.to.equal("").and.exitCode(0);
      expect(errorOutput).stdout.to.equal("").and.exit.code.to.not.equal(0);
      expect(hasOutput).to.have.stdout("Argument #1: --foo\nArgument #2: --bar\n").and.exit.code(0);

      // Should syntax
      noOutput.should.have.stdout.with.lengthOf(0).and.exitCode(0);
      errorOutput.should.have.stdout.that.equals("").and.exit.code.should.not.equal(0);
      hasOutput.should.have.stdout("Argument #1: --foo\nArgument #2: --bar\n").and.exit.code(0);
    });
  });

  describe("failed assertions", () => {

    it("should test stdout equality", () => {
      // Expect syntax
      (() => {
        expect(noOutput).to.have.stdout("something");
      }).should.throw('expected "test/fixtures/bin/echo-args" stdout to equal \'something\'');

      (() => {
        expect(errorOutput).to.have.stdout("something", "my custom message");
      }).should.throw("my custom message");

      (() => {
        expect(hasOutput).to.have.stdout("something else");
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" stdout to equal \'something else\'');

      // Should syntax
      (() => {
        noOutput.should.have.stdout("something");
      }).should.throw('expected "test/fixtures/bin/echo-args" stdout to equal \'something\'');

      (() => {
        errorOutput.should.have.stdout("something", "my custom message");
      }).should.throw("my custom message");

      (() => {
        hasOutput.should.have.stdout("something else");
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" stdout to equal \'something else\'');

      // Assert syntax
      (() => {
        assert.stdout(noOutput, "something");
      }).should.throw('expected "test/fixtures/bin/echo-args" stdout to equal \'something\'');

      (() => {
        assert.stdout(errorOutput, "something", "my custom message");
      }).should.throw("my custom message");

      (() => {
        assert.stdout(hasOutput, "something else");
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" stdout to equal \'something else\'');
    });

    it("should test stdout inequality", () => {
      // Expect syntax
      (() => {
        expect(noOutput).not.to.have.stdout("");
      }).should.throw('expected "test/fixtures/bin/echo-args" stdout not to equal \'\'');

      (() => {
        expect(errorOutput).not.to.have.stdout("", "my custom message");
      }).should.throw("my custom message");

      (() => {
        expect(hasOutput).not.to.have.stdout("Argument #1: --foo\nArgument #2: --bar\n");
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" stdout not to equal \'Argument #1: --foo\\nArgument #2: --bar\\n\'');

      // Should syntax
      (() => {
        noOutput.should.not.have.stdout("");
      }).should.throw('expected "test/fixtures/bin/echo-args" stdout not to equal \'\'');

      (() => {
        errorOutput.should.not.have.stdout("", "my custom message");
      }).should.throw("my custom message");

      (() => {
        hasOutput.should.not.have.stdout("Argument #1: --foo\nArgument #2: --bar\n");
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" stdout not to equal \'Argument #1: --foo\\nArgument #2: --bar\\n\'');
    });

    it("should test stdout RegExp pattern", () => {
      (() => {
        assert.stdout(noOutput, /^something$/);
      }).should.throw('expected "test/fixtures/bin/echo-args" stdout to match /^something$/');

      (() => {
        assert.stdout(errorOutput, /^something$/, "my custom message");
      }).should.throw("my custom message");

      (() => {
        assert.stdout(hasOutput, /^something else$/);
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" stdout to match /^something else$/');
    });

  });
});
