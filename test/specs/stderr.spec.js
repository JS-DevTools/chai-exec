"use strict";

const chaiExec = require("../../");
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiExec);
chai.should();

describe("stderr", () => {
  let noOutput = chaiExec("test/fixtures/bin/echo-args");
  let hasOutput = chaiExec("test/fixtures/bin/echo-args --foo --bar");
  let errorOutput = chaiExec("test/fixtures/bin/exit-code 1");

  describe("successful assertions", () => {
    it("should test stderr equality", () => {
      // Expect syntax
      expect(noOutput.stderr).to.equal("");
      expect(hasOutput).to.have.stderr("");
      expect(errorOutput).stderr.to.equal("Process was exited with code 1\n");

      // Should syntax
      noOutput.stderr.should.equal("");
      hasOutput.should.have.stderr("");
      errorOutput.stderr.should.equal("Process was exited with code 1\n");

      // Assert syntax
      assert.stderr(noOutput, "");
      assert.stderr(hasOutput, "");
      assert.stderr(errorOutput, "Process was exited with code 1\n");
    });

    it("should test stderr inequality", () => {
      // Expect syntax
      expect(noOutput.stderr).not.to.equal("anything");
      expect(hasOutput).not.to.have.stderr("anything");
      expect(errorOutput).stderr.not.to.equal("anything else");

      // Should syntax
      noOutput.stderr.should.not.equal("anything");
      hasOutput.should.not.have.stderr("anything");
      errorOutput.stderr.should.not.equal("anything else");

      // Assert syntax
      assert.notEqual(noOutput.stderr, "anything");
      assert.notEqual(hasOutput.stderr, "anything");
      assert.notEqual(errorOutput.stderr, "anything else");
    });

    it("should test stderr RegExp pattern", () => {
      // Expect syntax
      expect(noOutput.stderr).to.match(/^$/);
      expect(hasOutput).to.have.stderr.that.matches(/^$/);
      expect(errorOutput).stderr.to.match(/^Process was exited with code \d/);

      // Should syntax
      noOutput.stderr.should.match(/^$/);
      hasOutput.should.have.stderr.that.matches(/^$/);
      errorOutput.stderr.should.match(/^Process was exited with code \d/);

      // Assert syntax
      assert.stderr(noOutput, /^$/);
      assert.stderr(hasOutput, /^$/);
      assert.stderr(errorOutput, /^Process was exited with code \d/);
    });

    it("should be chainable with other assertions", () => {
      // Expect syntax
      expect(noOutput).stderr.to.equal("").and.exitCode(0);
      expect(hasOutput).to.have.stderr("").and.not.exit.code(1);
      expect(errorOutput).stderr.to.equal("Process was exited with code 1\n").and.exit.code.to.not.equal(0);

      // Should syntax
      noOutput.should.have.stderr.with.lengthOf(0).and.exitCode(0);
      hasOutput.should.have.stderr("").and.not.exit.code(1);
      errorOutput.should.have.stderr.that.equals("Process was exited with code 1\n").and.exit.code.should.not.equal(0);
    });
  });

  describe("failed assertions", () => {

    it("should test stderr equality", () => {
      // Expect syntax
      (() => {
        expect(noOutput).to.have.stderr("something");
      }).should.throw('expected "test/fixtures/bin/echo-args" stderr to equal \'something\'');

      (() => {
        expect(hasOutput).to.have.stderr("something");
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" stderr to equal \'something\'');

      (() => {
        expect(errorOutput).to.have.stderr("something else", "my custom message");
      }).should.throw("my custom message");

      // Should syntax
      (() => {
        noOutput.should.have.stderr("something");
      }).should.throw('expected "test/fixtures/bin/echo-args" stderr to equal \'something\'');

      (() => {
        hasOutput.should.have.stderr("something");
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" stderr to equal \'something\'');

      (() => {
        errorOutput.should.have.stderr("something else", "my custom message");
      }).should.throw("my custom message");

      // Assert syntax
      (() => {
        assert.stderr(noOutput, "something");
      }).should.throw('expected "test/fixtures/bin/echo-args" stderr to equal \'something\'');

      (() => {
        assert.stderr(hasOutput, "something");
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" stderr to equal \'something\'');

      (() => {
        assert.stderr(errorOutput, "something else", "my custom message");
      }).should.throw("my custom message");
    });

    it("should test stderr inequality", () => {
      // Expect syntax
      (() => {
        expect(noOutput).not.to.have.stderr("");
      }).should.throw('expected "test/fixtures/bin/echo-args" stderr not to equal \'\'');

      (() => {
        expect(hasOutput).not.to.have.stderr("");
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" stderr not to equal \'\'');

      (() => {
        expect(errorOutput).not.to.have.stderr("Process was exited with code 1\n", "my custom message");
      }).should.throw("my custom message");

      // Should syntax
      (() => {
        noOutput.should.not.have.stderr("");
      }).should.throw('expected "test/fixtures/bin/echo-args" stderr not to equal \'\'');

      (() => {
        hasOutput.should.not.have.stderr("");
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" stderr not to equal \'\'');

      (() => {
        errorOutput.should.not.have.stderr("Process was exited with code 1\n", "my custom message");
      }).should.throw("my custom message");
    });

    it("should test stderr RegExp pattern", () => {
      (() => {
        assert.stderr(noOutput, /^something$/);
      }).should.throw('expected "test/fixtures/bin/echo-args" stderr to match /^something$/');

      (() => {
        assert.stderr(hasOutput, /^something$/);
      }).should.throw('expected "test/fixtures/bin/echo-args --foo --bar" stderr to match /^something$/');

      (() => {
        assert.stderr(errorOutput, /^something$/, "my custom message");
      }).should.throw("my custom message");
    });

  });
});
