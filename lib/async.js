/**
 * The async func currently supports the following parms passed in by the user.
 * 1) 'my-cli', ['--foo', '--outFile', '/foo bar/baz']
 * 2) 'my-cli', '--foo', '--outFile=/foo bar/baz'
 * 3) 'my-cli --foo --outFile="/foo bar/baz"'
 * 4) 'my-cli'
 */
const spawn = require('child_process').spawn;
const stringArgv = require('string-argv');
const maybe = require('call-me-maybe');

let async = function sync(cli, ...args) {
  let spawnedProcess = null;
  let processObj = {};

  //Check the last arg to see if it's a function to indicate whether a cb was specified or not
  let cb = typeof args[args.length -1] === 'function' ? args.splice(args.length-1, 1)[0] : null;

  if(!cli) {
    throw 'Must specify command line program';
  }

  //1
  if(args && args.length === 1 && Array.isArray(args[0])) {
    spawnedProcess = spawn(cli, args[0]);
  }
  //2
  else if(args && args.length >= 1) {
    spawnedProcess = spawn(cli, args);
  }
  //3, 4
  else {
    //At this point the cli command was passed in as one large string
    parsedArray = stringArgv(cli);
    let parsedCli = parsedArray.splice(0, 1);
    spawnedProcess = spawn(parsedCli[0], parsedArray);
  }

  return maybe(cb, new Promise((resolve, reject) => {

    //Build the processObj similar to the one returned in node's child_process.spawnSync

    processObj['pid'] = spawnedProcess.pid;
    processObj['output'] = [];

    spawnedProcess.stdout.on('data', (data) => {
      processObj['output'].push(data);
      processObj['stdout'] += data;
    });

    spawnedProcess.stderr.on('data', (errorData) => {
      processObj['stderr'] += errorData;
    });

    spawnedProcess.on('error', (errorObj) => {
      processObj['error'] = errorObj;
      reject(processObj);
    });

    spawnedProcess.on('exit', (code, signal) => {
      processObj['status'] = code;
      processObj['signal'] = signal;

      resolve(processObj);
    });
  }));
}

module.exports = async;
