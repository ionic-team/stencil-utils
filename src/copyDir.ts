interface Options {
  filter?: string;
  transform?: (read: Function, write: Function) => void;
  clobber?: boolean;
  dereference?: boolean;
  stopOnErr?: boolean;
  errs?: NodeJS.WritableStream;
}


export declare function copyDir(source: string, dest: string, callback: (error: Error) => void): void;
export declare function copyDir(source: string, dest: string, options: Options, callback: (error: Error) => void): void;
