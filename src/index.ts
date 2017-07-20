import { rimraf as rimrafAsync } from './vendor/rimraf';
import { mkdirp as mkdirpAsync } from './vendor/mkdirp';
import { copyDir as copyDirAsync } from './vendor/copyDir';
import { concurrent } from './concurrent';
import { promisify, promisifyNr } from './utils/promisify';

const rimraf = promisifyNr(rimrafAsync);
const mkdirp = promisify(mkdirpAsync);
const copyDir = promisifyNr<string, string>(copyDirAsync);

async function run(argv: string[]) {
  console.log(argv);

  switch(argv[0]) {
  case 'rimraf':
    await rimraf(argv[1]);
    break;
  case 'mkdirp':
    await mkdirp(argv[1]);
    break;
  case 'copyDir':
    await copyDir(argv[1], argv[2]);
    break;
  case 'concurrent':
    concurrent(argv.slice(1));
    break;
  default:
    console.log(`
  The following is an invalid command: ${argv[0]}
  - please pass a command to execute: rimraf, mkdirp, copyDir, concurrent
    `);
    process.exit(1);
  }
}

export {
  rimraf,
  mkdirp,
  copyDir,
  run,
  concurrent
}
