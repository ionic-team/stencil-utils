import { concurrent } from './concurrent';
declare const rimrafPromised: (arg1: string) => Promise<undefined>;
declare const mkdirpPromised: (arg1: string) => Promise<{}>;
declare const copyDirPromised: (arg1: string, arg2: string) => Promise<undefined>;
declare function run(argv: string[]): Promise<void>;
export { rimrafPromised as rimraf, mkdirpPromised as mkdirp, copyDirPromised as copyDir, run, concurrent };
