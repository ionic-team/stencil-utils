"use strict";
/* Adapted from https://github.com/kimmobrunfeldt/concurrently */
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
const tree_kill_1 = require("./vendor/tree-kill");
const IS_WINDOWS = /^win/.test(process.platform);
function concurrent(commands) {
    var childrenInfo = {};
    var children = commands.map(function (cmd, index) {
        // Remove quotes.
        cmd = stripCmdQuotes(cmd);
        var spawnOpts = { stdio: 'inherit' };
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
    ['SIGINT', 'SIGTERM'].forEach(function (signal) {
        process.on(signal, function () {
            children.forEach(function (child) {
                tree_kill_1.killTree(child.pid, signal);
            });
        });
    });
}
exports.concurrent = concurrent;
function stripCmdQuotes(cmd) {
    // Removes the quotes surrounding a command.
    if (cmd[0] === '"' || cmd[0] === '\'') {
        return cmd.substr(1, cmd.length - 2);
    }
    else {
        return cmd;
    }
}
function spawnChild(cmd, options) {
    let child;
    try {
        child = spawnChildProcess(cmd, options);
    }
    catch (e) {
        console.error('Error occured when executing command: ' + cmd);
        console.error(e.stack);
        return process.exit(1);
    }
    return child;
}
function spawnChildProcess(command, options) {
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
}
;
