//TODO: Add more unit test cases for cb error handling as wells as promise rejections.

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

chai.use(chaiAsPromised);
chai.should();

let childProcessMock = null;
let async = null;
let cbSpy = null;

let rootEventMocks = {};
let stdOutEventMocks = {};
let stdErrEventMocks = {};

describe('The async function', () => {

  beforeEach(() => {
    cbSpy = sinon.spy();

    childProcessMock = {
      spawn: () => {
        return {
          pid: '1234',
          on: (event, eventCB) => {
            rootEventMocks[event] = eventCB;
          },
          stdout: {
            on: (event, eventCB) => {
              stdOutEventMocks[event] = eventCB;
            }
          },
          stderr: {
            on: (event, eventCB) => {
              stdErrEventMocks[event] = eventCB;
            }
          }
        }
      }
    }

    sinon.spy(childProcessMock, 'spawn');

    async = proxyquire('../../lib/async.js', {
      'child_process': childProcessMock
    });

  });

  it('should throw an error if no cli command is specified', () => {
    expect(async.bind(null)).to.throw('Must specify command line program');
  });

  describe('when only the cli command is specified', () => {

    describe('with a callback passed in', () => {
      beforeEach(() => {
        async('my-cli', cbSpy);
      });

      it('should only call the spawn method with the cli command', () => {
        sinon.assert.calledOnce(childProcessMock.spawn);
        sinon.assert.calledWithExactly(childProcessMock.spawn, 'my-cli', []);
      });

      it('should call the cb once the spawn process is complete', () => {
        rootEventMocks['exit'](1, null);

        setTimeout(() => {
          sinon.assert.calledOnce(cbSpy);
        }, 100);
      });
    });

    describe('when no callback is passed in', () => {
      let promise = null;

      beforeEach(() => {
        promise = async('my-cli');
        rootEventMocks['exit'](1, null);
      });

      it('should only call the spawn method with the cli command', () => {
        sinon.assert.calledOnce(childProcessMock.spawn);
        sinon.assert.calledWithExactly(childProcessMock.spawn, 'my-cli', []);
      });

      it('should return a promise that gets resolved with the process object', () => {

        return Promise.all([
          promise.should.eventually.be.fulfilled,
          promise.should.eventually.deep.equal({
            pid: '1234',
            output: [],
            status: 1,
            signal: null
          })
        ]);

      });
    })

  });

  //Ex. sync('my-cli', '--foo', '--outFile=/foo bar/baz')
  describe('when the cli is called with seperate strings', () => {

    describe('When a callback is passed in', () => {
      beforeEach(() => {
        async('my-cli', '--foo', '--outFile=/foo bar/baz', cbSpy);
      });

      it('should parse and execute the cli properly', () => {
        sinon.assert.calledWithExactly(childProcessMock.spawn, 'my-cli', ['--foo', '--outFile=/foo bar/baz']);
      });

      it('should execute the callback function when done', () => {
        setTimeout(() => {
          sinon.assert.calledOnce(cbSpy);
        }, 100);
      });
    });

    describe('when no callback is passed in', () => {
      let promise = null;
      beforeEach(() => {
        promise = async('my-cli', '--foo', '--outFile=/foo bar/baz');
        rootEventMocks['exit'](1, null);
      });

      it('should parse and execute the cli properly', () => {
        sinon.assert.calledWithExactly(childProcessMock.spawn, 'my-cli', ['--foo', '--outFile=/foo bar/baz']);
      });

      it('should return a promise that gets resolved with the process object', () => {

        return Promise.all([
          promise.should.eventually.be.fulfilled,
          promise.should.eventually.deep.equal({
            pid: '1234',
            output: [],
            status: 1,
            signal: null
          })
        ]);

      });
    });

  });

  //Ex. sync('my-cli', ['--foo', '--outFile', '/foo bar/baz'])
  describe('When the cli is called with an array of arguments', () => {
    describe('When a callback is passed in', () => {
      beforeEach(() => {
        async('my-cli', ['--foo', '--outFile', '/foo bar/baz'], cbSpy);
      });

      it('should parse and execute the cli properly', () => {
        sinon.assert.calledWithExactly(childProcessMock.spawn, 'my-cli', ['--foo', '--outFile', '/foo bar/baz']);
      });

      it('should execute the callback function when done', () => {
        setTimeout(() => {
          sinon.assert.calledOnce(cbSpy);
        }, 100);
      });
    });

    describe('when no callback is passed in', () => {
      let promise = null;
      beforeEach(() => {
        promise = async('my-cli', ['--foo', '--outFile', '/foo bar/baz']);
        rootEventMocks['exit'](1, null);
      });

      it('should parse and execute the cli properly', () => {
        sinon.assert.calledWithExactly(childProcessMock.spawn, 'my-cli', ['--foo', '--outFile', '/foo bar/baz']);
      });

      it('should return a promise that gets resolved with the process object', () => {

        return Promise.all([
          promise.should.eventually.be.fulfilled,
          promise.should.eventually.deep.equal({
            pid: '1234',
            output: [],
            status: 1,
            signal: null
          })
        ]);

      });
    });
  });

  //Ex. sync('my-cli --foo --outFile="/foo bar/baz"')
  describe('When the cli is called as one string', () => {
    describe('When a callback is passed in', () => {
      beforeEach(() => {
        async('my-cli --foo --outFile="/foo bar/baz"', cbSpy);
      });

      it('should parse and execute the cli properly', () => {
        sinon.assert.calledWithExactly(childProcessMock.spawn, 'my-cli', ['--foo', '--outFile="/foo bar/baz"']);
      });

      it('should execute the callback function when done', () => {
        setTimeout(() => {
          sinon.assert.calledOnce(cbSpy);
        }, 100);
      });
    });

    describe('when no callback is passed in', () => {
      let promise = null;
      beforeEach(() => {
        promise = async('my-cli --foo --outFile="/foo bar/baz"');
        rootEventMocks['exit'](1, null);
      });

      it('should parse and execute the cli properly', () => {
        sinon.assert.calledWithExactly(childProcessMock.spawn, 'my-cli', ['--foo', '--outFile="/foo bar/baz"']);
      });

      it('should return a promise that gets resolved with the process object', () => {

        return Promise.all([
          promise.should.eventually.be.fulfilled,
          promise.should.eventually.deep.equal({
            pid: '1234',
            output: [],
            status: 1,
            signal: null
          })
        ]);

      });
    });
  });
})
