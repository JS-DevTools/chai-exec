'use strict';

const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

let childProcessMock = null;
let sync = null;

describe('The sync function', () => {

  beforeEach(() => {

    childProcessMock = {
      spawnSync: sinon.spy()
    };

    sync = proxyquire('../../lib/sync.js', {
      child_process: childProcessMock     // eslint-disable-line camelcase
    });

  });

  it('should throw an error if no cli command is specified', () => {
    expect(sync.bind(null)).to.throw('Must specify command line program');
  });

  describe('when only the cli command is specified', () => {
    it('should only call spawnSync with the cli command', () => {
      sync('my-cli');
      sinon.assert.calledOnce(childProcessMock.spawnSync);
      sinon.assert.calledWithExactly(childProcessMock.spawnSync, 'my-cli', []);
    });
  });

  // Ex. sync('my-cli', '--foo', '--outFile=/foo bar/baz')
  describe('when the cli is called with seperate strings', () => {
    beforeEach(() => {
      sync('my-cli', '--foo', '--outFile=/foo bar/baz');
    });

    it('should parse and execute the cli properly', () => {
      sinon.assert.calledOnce(childProcessMock.spawnSync);
      sinon.assert.calledWithExactly(childProcessMock.spawnSync, 'my-cli', ['--foo', '--outFile=/foo bar/baz']);
    });

  });

  // Ex. sync('my-cli', ['--foo', '--outFile', '/foo bar/baz'])
  describe('When the cli is called with an array of arguments', () => {
    it('should parse and execute the cli properly', () => {
      sync('my-cli', ['--foo', '--outFile', '/foo bar/baz']);

      sinon.assert.calledOnce(childProcessMock.spawnSync);
      sinon.assert.calledWithExactly(childProcessMock.spawnSync, 'my-cli', ['--foo', '--outFile', '/foo bar/baz']);
    });
  });

  // Ex. sync('my-cli --foo --outFile="/foo bar/baz"')
  describe('When the cli is called as one string', () => {
    beforeEach(() => {
      sync('my-cli --foo --outFile="/foo bar/baz"');
    });

    it('should parse and execute the cli properly', () => {
      sinon.assert.calledOnce(childProcessMock.spawnSync);
      sinon.assert.calledWithExactly(childProcessMock.spawnSync, 'my-cli', ['--foo', '--outFile="/foo bar/baz"']);
    });
  });

});
