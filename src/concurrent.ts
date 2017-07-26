/* Adapted from https://github.com/kimmobrunfeldt/concurrently */

import * as childProcess from 'child_process';
import { killTree } from './vendor/tree-kill';

interface SpawnOptions {
  cwd?: string;
  env?: any;
  stdio?: any;
  detached?: boolean;
  uid?: number;
  gid?: number;
  shell?: boolean | string;
}

interface ChildInfo {
  command: string
  index: number,
  options: SpawnOptions
}

interface SpawnedChildren {
  [key: number]: ChildInfo
}

const IS_WINDOWS = /^win/.test(process.platform);


export function concurrent(commands: string[]) {
  var childrenInfo: SpawnedChildren = {};
  var children = commands.map(function(cmd, index) {
    // Remove quotes.
    cmd = stripCmdQuotes(cmd);

    var spawnOpts: SpawnOptions = {stdio: 'inherit'};
    if (IS_WINDOWS) {
      spawnOpts.detached = false;
    }

    var child = spawnChild(cmd, spawnOpts);

    childrenInfo[child.pid] = {
      command: cmd,
      index: index,
      options: spawnOpts,
    };
    return child;
  });

  ['SIGINT', 'SIGTERM'].forEach(function(signal: NodeJS.Signals) {
    process.on(signal, function() {
      children.forEach(function(child) {
        killTree(child.pid, signal);
      });
    });
  });
}

function stripCmdQuotes(cmd: string) {
  // Removes the quotes surrounding a command.
  if (cmd[0] === '"' || cmd[0] === '\'') {
    return cmd.substr(1, cmd.length - 2);
  } else {
    return cmd;
  }
}


function spawnChild(cmd: string, options: SpawnOptions) {
  let child: childProcess.ChildProcess | undefined;
  try {
    child = spawnChildProcess(cmd, options);
  } catch (e) {
    console.error('Error occured when executing command: ' + cmd);
    console.error(e.stack);
    return process.exit(1);
  }
  return child;
}


function spawnChildProcess(command: string, options: any): childProcess.ChildProcess {
  var file, args;
  if (process.platform === 'win32') {
    file = 'cmd.exe';
    args = ['/s', '/c', '"' + command + '"'];
    options = Object.assign({}, options);
    options.windowsVerbatimArguments = true;
  }
  else {
    file = '/bin/sh';
    args = ['-c', command];
  }
  return childProcess.spawn(file, args, options);
};
