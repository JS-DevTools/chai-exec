"use strict";

const chaiExec = require("../../");
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiExec);
chai.should();

describe("exitCode", () => {
  let exitWithZero = chaiExec("test/fixtures/bin/exit-code 0");
  let exitWithOne = chaiExec("test/fixtures/bin/exit-code 1");
  let exitWithFive = chaiExec("test/fixtures/bin/exit-code 5");

  describe("successful assertions", () => {
    it("should test exit code equality", () => {
      // Expect syntax
      expect(exitWithOne).to.have.exitCode(1);
      expect(exitWithZero).to.exit.with.code(0);

      // Should syntax
      exitWithZero.should.have.exitCode(0);
      exitWithOne.should.exit.with.code(1);

      // Assert syntax
      assert.exitCode(exitWithZero, 0);
      assert.exitCode(exitWithOne, 1);
    });

    it("should test exit code inequality", () => {
      // Expect syntax
      expect(exitWithZero).not.to.exit.with.code(1);
      expect(exitWithOne).not.to.have.exitCode(0);

      // Should syntax
      exitWithZero.should.not.have.exitCode(1);
      exitWithOne.should.not.exit.with.code(0);

      // Assert syntax
      assert.notExitCode(exitWithZero, 1);
      assert.notExitCode(exitWithOne, 0);
    });

    it("should test exit code range", () => {
      // Expect syntax
      expect(exitWithZero).not.to.exit.with.code.above(0);
      expect(exitWithOne).to.have.exitCode.that.is.above(0).and.below(2);

      // Should syntax
      exitWithZero.should.not.have.exitCode.above(1);
      exitWithOne.should.exit.with.code.below(2).and.above(0);

      // Assert syntax
      assert.exitCodeBetween(exitWithZero, -1, 1);
      assert.exitCodeNotBetween(exitWithOne, 4, 7);
    });

    it("should test exit code within a set", () => {
      // Expect syntax
      expect(exitWithZero).to.exit.with.code.that.is.oneOf([0, 1, 2]);
      expect(exitWithOne).to.have.exitCode.that.is.not.oneOf([4, 5, 6]);

      // Should syntax
      exitWithZero.should.have.exitCode.that.is.oneOf([0, 1, 2]);
      exitWithOne.should.exit.with.code.that.is.not.oneOf([4, 5, 6]);

      // Assert syntax
      assert.exitCode(exitWithZero, [0, 1, 2]);
      assert.notExitCode(exitWithOne, [4, 5, 6]);
    });

    it("should be chainable with other assertions", () => {
      // Expect syntax
      expect(exitWithZero).to.exit.with.code(0).and.have.stdout("Process was exited with code 0\n");
      expect(exitWithOne).to.have.exitCode(1).with.stderr.that.contains("exited with code 1");

      // Should syntax
      exitWithZero.should.have.exitCode(0).and.have.stdout.with.lengthOf(31);
      exitWithOne.should.exit.with.code(1).and.be.an("object");
    });
  });

  describe("failed assertions", () => {

    it("should throw a useful error when the exitCode is invalid", () => {
      // Expect syntax
      (() => {
        let cli = chaiExec();
        expect(cli).to.exit.with.code(999);
      }).should.throw('expected "" to exit with a code of 999, but it exited with null');

      (() => {
        let cli = chaiExec("does/not/exist");
        expect(cli).to.have.exitCode(999, "my custom message");
      }).should.throw("my custom message");

      // Should syntax
      (() => {
        let cli = chaiExec();
        cli.should.exit.with.code(999);
      }).should.throw('expected "" to exit with a code of 999, but it exited with null');

      (() => {
        let cli = chaiExec("does/not/exist");
        cli.should.have.exitCode(999, "my custom message");
      }).should.throw("my custom message");

      // Assert syntax
      (() => {
        let cli = chaiExec();
        assert.exitCode(cli, 999);
      }).should.throw('expected "" to exit with a code of 999, but it exited with null');

      (() => {
        let cli = chaiExec("does/not/exist");
        assert.exitCode(cli, 999, "my custom message");
      }).should.throw("my custom message");
    });

    it("should test exit code equality", () => {
      // Expect syntax
      (() => {
        expect(exitWithZero).to.exit.with.code(999);
      }).should.throw('expected "test/fixtures/bin/exit-code 0" to exit with a code of 999, but it exited with 0');

      (() => {
        expect(exitWithOne).to.have.exitCode(999, "my custom message");
      }).should.throw("my custom message");

      // Should syntax
      (() => {
        exitWithOne.should.have.exitCode(0);
      }).should.throw('expected "test/fixtures/bin/exit-code 1" to exit with a code of 0, but it exited with 1');

      (() => {
        exitWithZero.should.exit.with.code(1);
      }).should.throw('expected "test/fixtures/bin/exit-code 0" to exit with a code of 1, but it exited with 0');

      (() => {
        exitWithZero.should.exit.with.code(1, "my custom message");
      }).should.throw("my custom message");

      // Assert syntax
      (() => {
        assert.exitCode(exitWithZero, 1);
      }).should.throw('expected "test/fixtures/bin/exit-code 0" to exit with a code of 1, but it exited with 0');

      (() => {
        assert.exitCode(exitWithOne, 0);
      }).should.throw('expected "test/fixtures/bin/exit-code 1" to exit with a code of 0, but it exited with 1');

      (() => {
        assert.exitCode(exitWithOne, 0, "my custom message");
      }).should.throw("my custom message");
    });

    it("should test exit code inequality", () => {
      // Expect syntax
      (() => {
        expect(exitWithZero).not.to.have.exitCode(0);
      }).should.throw('expected "test/fixtures/bin/exit-code 0" not to exit with a code of 0');

      (() => {
        expect(exitWithZero).not.to.have.exitCode(0, "my custom message");
      }).should.throw("my custom message");

      // Should syntax
      (() => {
        exitWithOne.should.not.have.exitCode(1);
      }).should.throw('expected "test/fixtures/bin/exit-code 1" not to exit with a code of 1');

      (() => {
        exitWithOne.should.not.have.exitCode(1, "my custom message");
      }).should.throw("my custom message");

      // Assert syntax
      (() => {
        assert.notExitCode(exitWithZero, 0);
      }).should.throw('expected "test/fixtures/bin/exit-code 0" not to exit with a code of 0');

      (() => {
        assert.notExitCode(exitWithZero, 0, "my custom message");
      }).should.throw("my custom message");

    });

    it("should test exit code range", () => {
      // Expect syntax
      (() => {
        expect(exitWithOne).not.to.exit.with.code.above(0);
      }).should.throw("expected 1 to be at most 0");

      (() => {
        expect(exitWithZero).to.have.exitCode.that.is.above(0).and.below(2);
      }).should.throw("expected 0 to be above 0");

      (() => {
        expect(exitWithFive).to.have.exitCode.that.is.above(0).and.below(2);
      }).should.throw("expected 5 to be below 2");

      // Should syntax
      (() => {
        exitWithZero.should.have.exitCode.above(1);
      }).should.throw("expected 0 to be above 1");

      (() => {
        exitWithFive.should.not.have.exitCode.above(1);
      }).should.throw("expected 5 to be at most 1");

      (() => {
        exitWithZero.should.exit.with.code.below(2).and.above(0);
      }).should.throw("expected 0 to be above 0");

      (() => {
        exitWithFive.should.exit.with.code.below(2).and.above(0);
      }).should.throw("expected 5 to be below 2");

      // Assert syntax
      (() => {
        assert.exitCodeBetween(exitWithFive, -1, 1);
      }).should.throw('expected "test/fixtures/bin/exit-code 5" to exit with a code between -1 and 1, but it exited with 5');

      (() => {
        assert.exitCodeNotBetween(exitWithFive, 4, 7);
      }).should.throw("expected \"test/fixtures/bin/exit-code 5\" to exit with a code that's not between 4 and 7, but it exited with 5");
    });

    it("should test exit code within a set", () => {
      // Expect syntax
      (() => {
        expect(exitWithFive).to.exit.with.code.that.is.oneOf([0, 1, 2]);
      }).should.throw("expected 5 to be one of [ 0, 1, 2 ]");

      (() => {
        expect(exitWithFive).to.have.exitCode.that.is.not.oneOf([4, 5, 6]);
      }).should.throw("expected 5 to not be one of [ 4, 5, 6 ]");

      (() => {
        expect(exitWithFive).to.have.exitCode.that.is.not.oneOf([4, 5, 6], "my error message");
      }).should.throw("my error message");

      // Should syntax
      (() => {
        exitWithZero.should.have.exitCode.that.is.oneOf([1, 2, 3]);
      }).should.throw("expected 0 to be one of [ 1, 2, 3 ]");

      (() => {
        exitWithOne.should.exit.with.code.that.is.not.oneOf([1, 2, 3]);
      }).should.throw("expected 1 to not be one of [ 1, 2, 3 ]");

      (() => {
        exitWithOne.should.exit.with.code.that.is.not.oneOf([1, 2, 3], "my error message");
      }).should.throw("my error message");

      // Assert syntax
      (() => {
        assert.exitCode(exitWithZero, [1, 2, 3]);
      }).should.throw('expected "test/fixtures/bin/exit-code 0" to exit with one of [ 1, 2, 3 ], but it exited with 0');

      (() => {
        assert.notExitCode(exitWithOne, [1, 2, 3]);
      }).should.throw('expected "test/fixtures/bin/exit-code 1" to not exit with one of [ 1, 2, 3 ], but it exited with 1');

      (() => {
        assert.notExitCode(exitWithOne, [1, 2, 3], "my error message");
      }).should.throw("my error message");
    });

  });

});
