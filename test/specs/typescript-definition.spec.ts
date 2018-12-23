import chai = require("chai");
import chaiExec = require("../../");

const { assert, expect } = chai;
const { chaiExecSync, chaiExecAsync } = chaiExec;
const options = { cwd: "/usr/local/bin" };

chai.use(chaiExec);
chai.use(chaiExecSync);
chai.use(chaiExecAsync);

export function testChaiExec() {
  // Chai Plugin signature
  chaiExec(chai, {});

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
  // Chai Plugin signature
  chaiExecSync(chai, {});

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
  // Chai Plugin signature
  chaiExecAsync(chai, {});

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
  expect(git).status.to.equal(0);
  expect(git).exitCode.to.equal(0);
  expect(git).status.to.equal(0);
  expect(git).exitCode.to.equal(0);
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
  assert.exitCode(git, [1, 2, 3]);
  assert.notExitCode(git, 1);
  assert.notExitCode(git, [1, 2, 3]);
  assert.exitCodeBetween(git, 0, 1);
  assert.exitCodeNotBetween(git, 0, 1);
}

export function testStdoutAssertions() {
  let git = chaiExec('git commit -am "Fixed a bug"');

  // Should syntax
  git.stdout.should.contain("Success!");
  git.should.have.stdout("Success!");
  git.should.have.stdout.that.contains("Success!");

  // Expect syntax
  expect(git.stdout).to.contain("Success!");
  expect(git).stdout.to.contain("Success!");
  expect(git).to.have.stdout("Success!");
  expect(git).to.have.stdout.that.contains("Success!");

  // Assert syntax
  assert.stdout(git, "Success!");
  assert.stdout(git, /Success!/);
  assert.include(git.stdout, "Success!");
  assert.notInclude(git.stdout, "Success!");
  assert.match(git.stdout, /^Success!$/);
  assert.notMatch(git.stdout, /^Success!$/);
}

export function testStderrAssertions() {
  let git = chaiExec('git commit -am "Fixed a bug"');

  // Should syntax
  git.stderr.should.contain("Success!");
  git.should.have.stderr("Success!");
  git.should.have.stderr.that.contains("Success!");

  // Expect syntax
  expect(git.stderr).to.contain("Success!");
  expect(git).stderr.to.contain("Success!");
  expect(git).to.have.stderr("Success!");
  expect(git).to.have.stderr.that.contains("Success!");

  // Assert syntax
  assert.stderr(git, "Success!");
  assert.stderr(git, /Success!/);
  assert.include(git.stderr, "Success!");
  assert.notInclude(git.stderr, "Success!");
  assert.match(git.stderr, /^Success!$/);
  assert.notMatch(git.stderr, /^Success!$/);
}

export function testOutputAssertions() {
  let git = chaiExec('git commit -am "Fixed a bug"');

  // Should syntax
  git.output.should.contain("Success!");
  git.should.have.output("Success!");
  git.should.have.output.that.contains("Success!");

  // Expect syntax
  expect(git.output).to.contain("Success!");
  expect(git).output.to.contain("Success!");
  expect(git).to.have.output("Success!");
  expect(git).to.have.output.that.contains("Success!");

  // Assert syntax
  assert.output(git, "Success!");
  assert.output(git, /Success!/);
  assert.include(git.output, "Success!");
  assert.notInclude(git.output, "Success!");
  assert.match(git.output, /^Success!$/);
  assert.notMatch(git.output, /^Success!$/);
}
