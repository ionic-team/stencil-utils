import { rimraf } from './rimraf';
import { mkdirp } from './mkdirp';
import { copyDir } from './copyDir';
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
    const made = await mkdirpPr(argv[1]);
    console.log(made);
    break;
  case 'copyDir':
    await copyDirPr(argv[1], argv[2]);
    break;
  case 'concurrent':
    concurrent(argv.slice(1));
  case undefined:
    console.log('please pass a command to execute');
    process.exit(1);
  default:
  }
}
