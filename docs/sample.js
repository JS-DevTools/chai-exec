/* eslint no-undef:off */
'use strict';

const chaiExec = require('chai-exec');
const chai = require('chai');
chai.use(chaiExec);

describe('My CLI', () => {
  it('should exit with a zero exit code', () => {
    let process = chaiExec.sync('my-cli', '--arg1');

    expect(process.exitCode).to.equal(0);
    process.exitCode.should.equal(0);
    assert.equal(process.exitCode, 0);

    expect(process).to.exit.with(0);
    expect(process).to.exit.with.code(0);
    expect(process).to.have.exitCode(0);

    process.should.exit.with(0);
    process.should.exit.with.code.above(0, 'the exit code is invalid');
    process.should.have.exitCode(0, 'you coded it wrong');

    assert.exitCode(process, 0);
  });
});
