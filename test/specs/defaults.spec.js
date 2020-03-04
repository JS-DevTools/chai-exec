"use strict";

const chaiExec = require("../../");
const chai = require("chai");

chai.use(chaiExec);
chai.should();

describe("defaults", () => {
  afterEach("reset chaiExec.defaults", () => {
    chaiExec.defaults = {};
  });

  describe("defaults.command", () => {
    it("should use the default command", () => {
      chaiExec.defaults.command = "test/fixtures/bin/echo-args";
      let cli = chaiExec();

      cli.command.should.equal("test/fixtures/bin/echo-args");
      cli.args.should.deep.equal([]);
      cli.should.have.stdout("");
    });

    it("should append args to the default command", () => {
      chaiExec.defaults.command = "test/fixtures/bin/echo-args";
      let cli = chaiExec("--foo --bar");

      cli.command.should.equal("test/fixtures/bin/echo-args");
      cli.args.should.deep.equal(["--foo", "--bar"]);
      cli.should.have.stdout("Argument #1: --foo\nArgument #2: --bar\n");
    });

    it("should append separate args to the default command", () => {
      chaiExec.defaults.command = "test/fixtures/bin/echo-args";
      let cli = chaiExec("--foo", "--bar");

      cli.command.should.equal("test/fixtures/bin/echo-args");
      cli.args.should.deep.equal(["--foo", "--bar"]);
      cli.should.have.stdout("Argument #1: --foo\nArgument #2: --bar\n");
    });

    it("should append an array of args to the default command", () => {
      chaiExec.defaults.command = "test/fixtures/bin/echo-args";
      let cli = chaiExec(["--foo", "--bar"]);

      cli.command.should.equal("test/fixtures/bin/echo-args");
      cli.args.should.deep.equal(["--foo", "--bar"]);
      cli.should.have.stdout("Argument #1: --foo\nArgument #2: --bar\n");
    });
  });

  describe("defaults.args", () => {
    describe("string", () => {
      it("should ignore empty strings", () => {
        chaiExec.defaults.command = "";
        chaiExec.defaults.args = "";
        let cli = chaiExec("test/fixtures/bin/echo-args --foo --bar");

        cli.command.should.equal("test/fixtures/bin/echo-args");
        cli.args.should.deep.equal(["--foo", "--bar"]);
        cli.should.have.stdout("Argument #1: --foo\nArgument #2: --bar\n");
      });

      it("should use the default args", () => {
        chaiExec.defaults.args = "--foo --bar";
        let cli = chaiExec("test/fixtures/bin/echo-args");

        cli.command.should.equal("test/fixtures/bin/echo-args");
        cli.args.should.deep.equal(["--foo", "--bar"]);
        cli.should.have.stdout("Argument #1: --foo\nArgument #2: --bar\n");
      });

      it("should use the default command and args", () => {
        chaiExec.defaults.command = "test/fixtures/bin/echo-args";
        chaiExec.defaults.args = "--foo --bar";
        let cli = chaiExec();

        cli.command.should.equal("test/fixtures/bin/echo-args");
        cli.args.should.deep.equal(["--foo", "--bar"]);
        cli.should.have.stdout("Argument #1: --foo\nArgument #2: --bar\n");
      });

      it("should append args to the default command and args", () => {
        chaiExec.defaults.command = "test/fixtures/bin/echo-args";
        chaiExec.defaults.args = "--foo --bar";
        let cli = chaiExec("--biz --baz");

        cli.command.should.equal("test/fixtures/bin/echo-args");
        cli.args.should.deep.equal(["--foo", "--bar", "--biz", "--baz"]);
        cli.should.have.stdout("Argument #1: --foo\nArgument #2: --bar\nArgument #3: --biz\nArgument #4: --baz\n");
      });
    });

    describe("array", () => {
      it("should ignore an empty array", () => {
        chaiExec.defaults.args = [];
        let cli = chaiExec("test/fixtures/bin/echo-args --foo --bar");

        cli.command.should.equal("test/fixtures/bin/echo-args");
        cli.args.should.deep.equal(["--foo", "--bar"]);
        cli.should.have.stdout("Argument #1: --foo\nArgument #2: --bar\n");
      });

      it("should use the default args", () => {
        chaiExec.defaults.args = ["--foo", "--bar"];
        let cli = chaiExec("test/fixtures/bin/echo-args");

        cli.command.should.equal("test/fixtures/bin/echo-args");
        cli.args.should.deep.equal(["--foo", "--bar"]);
        cli.should.have.stdout("Argument #1: --foo\nArgument #2: --bar\n");
      });

      it("should use the default command and args", () => {
        chaiExec.defaults.command = "test/fixtures/bin/echo-args";
        chaiExec.defaults.args = ["--foo", "--bar"];
        let cli = chaiExec();

        cli.command.should.equal("test/fixtures/bin/echo-args");
        cli.args.should.deep.equal(["--foo", "--bar"]);
        cli.should.have.stdout("Argument #1: --foo\nArgument #2: --bar\n");
      });

      it("should append separate args to the default command and args", () => {
        chaiExec.defaults.command = "test/fixtures/bin/echo-args";
        chaiExec.defaults.args = ["--foo", "--bar"];
        let cli = chaiExec("--biz", "--baz");

        cli.command.should.equal("test/fixtures/bin/echo-args");
        cli.args.should.deep.equal(["--foo", "--bar", "--biz", "--baz"]);
        cli.should.have.stdout("Argument #1: --foo\nArgument #2: --bar\nArgument #3: --biz\nArgument #4: --baz\n");
      });

      it("should append an array of args to the default command and args", () => {
        chaiExec.defaults.command = "test/fixtures/bin/echo-args";
        chaiExec.defaults.args = ["--foo", "--bar"];
        let cli = chaiExec(["--biz", "--baz"]);

        cli.command.should.equal("test/fixtures/bin/echo-args");
        cli.args.should.deep.equal(["--foo", "--bar", "--biz", "--baz"]);
        cli.should.have.stdout("Argument #1: --foo\nArgument #2: --bar\nArgument #3: --biz\nArgument #4: --baz\n");
      });
    });
  });

  describe("defaults.options", () => {
    it("should use the default options", () => {
      chaiExec.defaults.options = { env: { foo: "Hello", bar: "world" }};
      let cli = chaiExec("test/fixtures/bin/echo-env foo bar");

      cli.command.should.equal("test/fixtures/bin/echo-env");
      cli.args.should.deep.equal(["foo", "bar"]);

      cli.stderr.should.equal("");
      cli.should.have.exitCode(0);
      cli.stdout.should.equal("foo: Hello\nbar: world\n");
      cli.should.have.stdout("foo: Hello\nbar: world\n");
    });

    it("should use the default command and options", () => {
      chaiExec.defaults.command = "test/fixtures/bin/echo-env";
      chaiExec.defaults.options = { env: { foo: "Hello", bar: "world" }};
      let cli = chaiExec("foo bar");

      cli.command.should.equal("test/fixtures/bin/echo-env");
      cli.args.should.deep.equal(["foo", "bar"]);
      cli.should.have.stdout("foo: Hello\nbar: world\n");
    });

    it("should use the default command, args, and options", () => {
      chaiExec.defaults.command = "test/fixtures/bin/echo-env";
      chaiExec.defaults.args = "foo bar";
      chaiExec.defaults.options = { env: { foo: "Hello", bar: "world" }};
      let cli = chaiExec();

      cli.command.should.equal("test/fixtures/bin/echo-env");
      cli.args.should.deep.equal(["foo", "bar"]);
      cli.should.have.stdout("foo: Hello\nbar: world\n");
    });

    it("should append args to the default args, and options", () => {
      chaiExec.defaults.args = ["foo", "bar"];
      chaiExec.defaults.options = { env: { foo: "Hello", bar: "world", biz: "AAA", baz: "BBB" }};
      let cli = chaiExec(["test/fixtures/bin/echo-env", "biz", "baz"]);

      cli.command.should.equal("test/fixtures/bin/echo-env");
      cli.args.should.deep.equal(["foo", "bar", "biz", "baz"]);
      cli.should.have.stdout("foo: Hello\nbar: world\nbiz: AAA\nbaz: BBB\n");
    });

    it("should append args to the default command, args, and options", () => {
      chaiExec.defaults.command = "test/fixtures/bin/echo-env";
      chaiExec.defaults.args = "foo bar";
      chaiExec.defaults.options = { env: { foo: "Hello", bar: "world", biz: "AAA", baz: "BBB" }};
      let cli = chaiExec("biz baz");

      cli.command.should.equal("test/fixtures/bin/echo-env");
      cli.args.should.deep.equal(["foo", "bar", "biz", "baz"]);
      cli.should.have.stdout("foo: Hello\nbar: world\nbiz: AAA\nbaz: BBB\n");
    });
  });
});
