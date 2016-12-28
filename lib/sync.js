/**
 * It currently supports the following parms passed in by the user.
 * 1) 'my-cli', ['--foo', '--outFile', '/foo bar/baz']
 * 2) 'my-cli', '--foo', '--outFile=/foo bar/baz'
 * 3) 'my-cli --foo --outFile="/foo bar/baz"'
 * 4) 'my-cli'
 */
const spawnSync = require('child_process').spawnSync;
const stringArgv = require('string-argv');

let sync = function sync(cli, ...args) {
  let output = null;

  if(!cli) {
    throw 'Must specify command line program';
  }

  //1
  if(args.length === 1 && Array.isArray(args[0])) {
    output = spawnSync(cli, args[0]);
  }
  //2
  else if (args.length >= 1) {
    output = spawnSync(cli, args);
  }
  //3, 4
  else {
    //At this point the cli command was passed in as one large string
    parsedArray = stringArgv(cli);
    let parsedCli = parsedArray.splice(0, 1);
    output = spawnSync(parsedCli[0], parsedArray);
  }

  return output;
}

module.exports = sync;
