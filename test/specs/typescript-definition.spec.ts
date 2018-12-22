import chai = require("chai");
import chaiExec = require("../../");

const { assert, expect } = chai;
const { chaiExecSync, chaiExecAsync } = chaiExec;
const options = { cwd: "/usr/local/bin" };

chai.use(chaiExec);
chai.should();

export function testChaiExec() {
  // Sync signatures without options
  chaiExec('git commit -am "Fixed a bug"');
  chaiExec(["git", "commit", "-am", "Fixed a bug"]);
  chaiExec("git", ["commit", "-am", "Fixed a bug"]);
  chaiExec("git", "commit", "-am", "Fixed a bug");

  // Sync signatures with options
  chaiExec('git commit -am "Fixed a bug"', options);
  chaiExec(["git", "commit", "-am", "Fixed a bug"], options);
  chaiExec("git", ["commit", "-am", "Fixed a bug"], options);
  chaiExec("git", "commit", "-am", "Fixed a bug", options);
}

export function testChaiExecSync() {
  // Sync signatures without options
  chaiExecSync('git commit -am "Fixed a bug"');
  chaiExecSync(["git", "commit", "-am", "Fixed a bug"]);
  chaiExecSync("git", ["commit", "-am", "Fixed a bug"]);
  chaiExecSync("git", "commit", "-am", "Fixed a bug");

  // Sync signatures with options
  chaiExecSync('git commit -am "Fixed a bug"', options);
  chaiExecSync(["git", "commit", "-am", "Fixed a bug"], options);
  chaiExecSync("git", ["commit", "-am", "Fixed a bug"], options);
  chaiExecSync("git", "commit", "-am", "Fixed a bug", options);
}

export async function testChaiExecAsync() {
  // Promise signatures without options
  await chaiExecAsync('git commit -am "Fixed a bug"');
  await chaiExecAsync(["git", "commit", "-am", "Fixed a bug"]);
  await chaiExecAsync("git", ["commit", "-am", "Fixed a bug"]);
  await chaiExecAsync("git", "commit", "-am", "Fixed a bug");

  // Promise signatures with options
  await chaiExecAsync('git commit -am "Fixed a bug"', options);
  await chaiExecAsync(["git", "commit", "-am", "Fixed a bug"], options);
  await chaiExecAsync("git", ["commit", "-am", "Fixed a bug"], options);
  await chaiExecAsync("git", "commit", "-am", "Fixed a bug", options);
}

export function testExitCodeAssertions() {
  let git = chaiExec('git commit -am "Fixed a bug"');

  // Should syntax
  git.status.should.equal(0);
  git.exitCode.should.equal(0);
  git.should.have.status(0);
  git.should.have.exitCode(0);
  git.should.exit.with.code(0);
  git.should.exit.with.a.status.that.is.a("number");
  git.should.exit.with.a.code.that.is.below(1);
  git.should.have.an.exit.code.of.at.least(0);
  git.should.have.exitCode(0).and.be.an("object");
  git.should.exit.with.code(0).and.be.an("object");

  // Expect sytnax
  expect(git.status).to.equal(0);
  expect(git.exitCode).to.equal(0);
  expect(git).to.have.status(0);
  expect(git).to.have.exitCode(0);
  expect(git).to.exit.with.code(0);
  expect(git).to.exit.with.a.status.that.is.a("number");
  expect(git).to.exit.with.a.code.that.is.below(1);
  expect(git).to.have.an.exit.code.of.at.least(0);
  expect(git).to.have.exitCode(0).and.be.an("object");
  expect(git).to.exit.with.code(0).and.be.an("object");

  // Assert syntax
  assert.equal(git.status, 0);
  assert.equal(git.exitCode, 0);
  assert.exitCode(git, 0);
  assert.notExitCode(git, 1);
  assert.exitCodeBetween(git, 0, 1);
}
