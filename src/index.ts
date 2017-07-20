import { rimraf } from './vendor/rimraf';
import { mkdirP } from './vendor/mkdirp';
import { copyDir } from './vendor/copyDir';
import { concurrent } from './concurrent';
import { promisify, promisifyNr } from './utils/promisify';

const rimrafPromised = promisifyNr(rimraf);
const mkdirpPromised = promisify(mkdirP);
const copyDirPromised = promisifyNr<string, string>(copyDir);

async function run(argv: string[]) {

  switch(argv[0]) {
  case 'rimraf':
    await rimrafPromised(argv[1]);
    break;
  case 'mkdirp':
    await mkdirpPromised(argv[1]);
    break;
  case 'copyDir':
    await copyDirPromised(argv[1], argv[2]);
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
  rimrafPromised as rimraf,
  mkdirpPromised as mkdirp,
  copyDirPromised as copyDir,
  run,
  concurrent
}
