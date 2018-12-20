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
  git.should.exit.with(0);
  git.should.exit.with.code(0);
  git.should.exit.with.a.code.that.is.below(1);
  git.should.have.an.exit.code.of.at.least(0);
  git.should.have.exitCode(0);

  // Expect sytnax
  expect(git).to.exit.with(0);
  expect(git).to.exit.with.code(0);
  expect(git).to.exit.with.a.code.that.is.below(1);
  expect(git).to.have.an.exit.code.of.at.least(0);
  expect(git).to.have.exitCode(0);

  // Assert syntax
  assert.exitCode(git, 0);
  assert.notExitCode(git, 1);
  assert.exitCodeBetween(git, 0, 1);
}
