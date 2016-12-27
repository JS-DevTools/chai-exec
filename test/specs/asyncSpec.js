var async = require('../../lib/async');

describe('The async function', () => {
  //Ex. sync('my-app', '--foo', '--outFile=/foo bar/baz')
  describe('when the cli is called with seperate strings', () => {
    it('should parse and execute the cli properly');
    it('should execute the callback function when done');
  });

  //Ex. sync('my-app', ['--foo', '--outFile', '/foo bar/baz'])
  describe('When the cli is called with an array of arguments', () => {
    it('should parse and execute the cli properly');
    it('should execute the callback function when done');
  });

  //Ex. sync('my-app --foo --outFile="/foo bar/baz"')
  describe('When the cli is called as one string', () => {
    it('should parse and execute the cli properly');
    it('should execute the callback function when done');
  });

})
