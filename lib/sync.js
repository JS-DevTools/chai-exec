const spawnSync = require('child_process').spawnSync;

let sync = function sync(cli, ...args) {
  let output = null;

  if(!cli) {
    throw 'Must specify command line program';
  }

  if(args.length === 0) {
    output = spawnSync(cli);
  }
  else if(args.length === 1 && Array.isArray(args[0])) {
    output = spawnSync(cli, args[0]);
  }
  else {
    output = spawnSync(cli, args);
  }

  return output;
}

module.exports = sync;
