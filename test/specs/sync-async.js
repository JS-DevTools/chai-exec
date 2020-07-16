"use strict";

const { chaiExecSync, chaiExecAsync } = require("../../");
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiExecSync);
chai.use(chaiExecAsync);
chai.should();

describe("chaiExecSync", () => {
  it("should return synchronously", () => {
    let cli = chaiExecSync("test/fixtures/bin/echo-args --foo --bar");

    // Expect syntax
    expect(cli).exit.code.to.equal(0);
    expect(cli).stdout.to.equal("Argument #1: --foo\nArgument #2: --bar\n");
    expect(cli).stderr.to.have.lengthOf(0);
    expect(cli).output.to.equal("Argument #1: --foo\nArgument #2: --bar\n");

    // Should syntax
    cli.should.have.exit.code(0);
    cli.should.have.stdout.that.equals("Argument #1: --foo\nArgument #2: --bar\n");
    cli.should.have.stderr.that.has.lengthOf(0);
    cli.should.have.output.that.equals("Argument #1: --foo\nArgument #2: --bar\n");

    // Assert syntax
    assert.exitCode(cli, 0);
    assert.stdout(cli, "Argument #1: --foo\nArgument #2: --bar\n");
    assert.stderr(cli, "");
    assert.output(cli, "Argument #1: --foo\nArgument #2: --bar\n");
  });
});

describe("chaiExecAsync", () => {
  it("should return asynchronously", () => {
    chaiExecAsync("test/fixtures/bin/echo-args --foo --bar")
      .then((cli) => {
        // Expect syntax
        expect(cli).exit.code.to.equal(0);
        expect(cli).stdout.to.equal("Argument #1: --foo\nArgument #2: --bar\n");
        expect(cli).stderr.to.have.lengthOf(0);
        expect(cli).output.to.equal("Argument #1: --foo\nArgument #2: --bar\n");

        // Should syntax
        cli.should.have.exit.code(0);
        cli.should.have.stdout.that.equals("Argument #1: --foo\nArgument #2: --bar\n");
        cli.should.have.stderr.that.has.lengthOf(0);
        cli.should.have.output.that.equals("Argument #1: --foo\nArgument #2: --bar\n");

        // Assert syntax
        assert.exitCode(cli, 0);
        assert.stdout(cli, "Argument #1: --foo\nArgument #2: --bar\n");
        assert.stderr(cli, "");
        assert.output(cli, "Argument #1: --foo\nArgument #2: --bar\n");
      });
  });
});
