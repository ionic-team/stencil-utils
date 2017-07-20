import * as fs from 'fs';
import { promisify } from './promisify';


export function parseOptions(optionInfo: { [key: string]: any }, argv: string[]): { [key: string]: any } {
  return Object.keys(optionInfo).reduce((options, key) => {
    let foundIndex = argv.indexOf(`--${key}`);
    if (foundIndex === -1) {
      options[key] = optionInfo[key].default;
      return options;
    }
    switch (optionInfo[key].type) {
    case Boolean:
      options[key] = true;
      break;
    case Number:
      options[key] = parseInt(argv[foundIndex + 1], 10);
      break;
    default:
      options[key] = argv[foundIndex + 1];
    }
    return options;
  }, <{[key: string]: any}>{});
}
