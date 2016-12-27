const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
let child_process = require('child_process');

let child_processMock = null;
let sync = null;
let output = null;

describe.only('The sync function', () => {

  beforeEach(() => {

    sinon.spy(child_process, 'spawnSync');

    sync = proxyquire('../../lib/sync.js', {
      'child_process': child_process
    });

  });

  afterEach(() => {
    child_process.spawnSync.restore();
  });

  it('should throw an error if no cli command is specified', () => {
    expect(sync.bind(null)).to.throw('Must specify command line program');
  });

  //Ex. sync('my-app', '--foo', '--outFile=/foo bar/baz')
  describe('when the cli is called with seperate strings', () => {
    beforeEach(() => {
      output = sync('ls', '--foo', 'bar');
    });

    it('should parse and execute the cli properly', () => {
      sinon.assert.calledOnce(child_process.spawnSync);
      sinon.assert.calledWith(child_process.spawnSync, 'ls', ['--foo', 'bar']);
    });

    it('should return an output object', () => {
      expect(output).to.be.an('object');

    });
  });

  //Ex. sync('my-app', ['--foo', '--outFile', '/foo bar/baz'])
  describe('When the cli is called with an array of arguments', () => {
    it('should parse and execute the cli properly', () => {
      sync('ls', ['--foo', 'bar']);

      sinon.assert.calledOnce(child_process.spawnSync);
      sinon.assert.calledWith(child_process.spawnSync, 'ls', ['--foo', 'bar']);
    });

    it('should return an output object', () => {
      expect(output).to.be.an('object');
    });

  });

  //Ex. sync('my-app --foo --outFile="/foo bar/baz"')
  describe('When the cli is called as one string', () => {
    beforeEach(() => {
      output = sync('ls --foo --outFile="/foo bar/baz"');
    });

    it('should parse and execute the cli properly', () => {
      sinon.assert.calledOnce(child_process.spawnSync);
      sinon.assert.calledWith(child_process.spawnSync, 'ls --foo --outFile="/foo bar/baz"');
    });

    it('should return an output object', () => {
      expect(output).to.be.an('object');
    });
  });

})
