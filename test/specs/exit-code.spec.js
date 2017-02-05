'use strict';

const chaiExec = require('../../');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiExec);
chai.should();

describe('exit-code', () => {
  let exitWithZero = chaiExec.sync('test/fixtures/bin/exit-code 0');
  let exitWithOne = chaiExec.sync('test/fixtures/bin/exit-code 1');

  describe('successful assertions', () => {
    it('should test exit code equality', () => {
      // Expect syntax
      expect(exitWithZero).to.exit.with.code(0);
      expect(exitWithOne).to.have.exitCode(1);

      // Should syntax
      exitWithZero.should.have.exitCode(0);
      exitWithOne.should.exit.with.code(1);

      // Assert syntax
      assert.exitCode(exitWithZero, 0);
      assert.exitCode(exitWithOne, 1);
    });

    it('should test exit code inequality', () => {
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

    it('should test exit code range', () => {
      // Expect syntax
      expect(exitWithZero).not.to.exit.with.code.above(0);
      expect(exitWithOne).to.have.exitCode.that.is.above(0).and.below(2);

      // Should syntax
      exitWithZero.should.not.have.exitCode.above(1);
      exitWithOne.should.exit.with.code.below(2).and.above(0);

      // Assert syntax
      assert.exitCodeBetween(exitWithZero, 0, 1);
      assert.exitCodeNotBetween(exitWithOne, 4, 7);
    });

    it('should test exit code within a set', () => {
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
  });

  describe('failed assertions', () => {

    it('should test exit code equality', () => {
      // Expect syntax
      (() => {
        expect(exitWithZero).to.exit.with.code(999);
      }).should.throw('expected exit code to equal 999, not zero');

      (() => {
        expect(exitWithOne).to.have.exitCode(999, 'my custom message');
      }).should.throw('my custom message');

      // Should syntax
      exitWithZero.should.have.exitCode(0);
      exitWithOne.should.exit.with.code(1);

      // Assert syntax
      assert.exitCode(exitWithZero, 0);
      assert.exitCode(exitWithOne, 1);
    });

  });

});
