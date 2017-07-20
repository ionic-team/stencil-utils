import { rimraf } from './vendor/rimraf';
import { mkdirp } from './vendor/mkdirp';
import { copyDir } from './vendor/copyDir';
import { concurrent } from './concurrent';
import { promisify, promisifyNr } from './utils/promisify';


const rimrafPr = promisifyNr(rimraf);
const mkdirpPr = promisify(mkdirp);
const copyDirPr = promisifyNr<string, string>(copyDir);

export async function run(argv: string[]) {

  switch(argv[0]) {
  case 'rimraf':
    await rimrafPr(argv[1]);
    break;
  case 'mkdirp':
    await mkdirpPr(argv[1]);
    break;
  case 'copyDir':
    await copyDirPr(argv[1], argv[2]);
    break;
  case 'concurrent':
    concurrent(argv.slice(1));
  default:
    console.log(`
  The following is an invalid command: ${argv[0]}
  - please pass a command to execute: rimraf, mkdirp, copyDir, concurrent
    `);
    process.exit(1);
  }
}
