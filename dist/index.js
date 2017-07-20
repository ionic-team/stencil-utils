"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rimraf_1 = require("./vendor/rimraf");
const mkdirp_1 = require("./vendor/mkdirp");
const copyDir_1 = require("./vendor/copyDir");
const concurrent_1 = require("./concurrent");
exports.concurrent = concurrent_1.concurrent;
const promisify_1 = require("./utils/promisify");
const rimrafPromised = promisify_1.promisifyNr(rimraf_1.rimraf);
exports.rimraf = rimrafPromised;
const mkdirpPromised = promisify_1.promisify(mkdirp_1.mkdirP);
exports.mkdirp = mkdirpPromised;
const copyDirPromised = promisify_1.promisifyNr(copyDir_1.copyDir);
exports.copyDir = copyDirPromised;
function run(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (argv[0]) {
            case 'rimraf':
                yield rimrafPromised(argv[1]);
                break;
            case 'mkdirp':
                yield mkdirpPromised(argv[1]);
                break;
            case 'copyDir':
                yield copyDirPromised(argv[1], argv[2]);
                break;
            case 'concurrent':
                concurrent_1.concurrent(argv.slice(1));
                break;
            default:
                console.log(`
  The following is an invalid command: ${argv[0]}
  - please pass a command to execute: rimraf, mkdirp, copyDir, concurrent
    `);
                process.exit(1);
        }
    });
}
exports.run = run;
