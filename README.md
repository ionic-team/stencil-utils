[![npm][npm-badge]][npm-badge-url]

# Stencil Utils

This is a simple set of tools that can be executed through a terminal or through function calls.

```
sd rimraf ./testdir
```

- **rimraf**
  - Provide a directory that should be recursively deleted from the filesystem
  - Example: `sd rimraf ./testdir`
- **copyDir**
  - Recursively copy all contents of one folder into another.
  - Example: `sd copyDir ./testdir ./testdir2`
- **mkdirp**
  - Create a directory and child directories based on path. Same as 'mkdir -p' in *nix systems.
  - Example: `sd mkdirp ./testdir/depth1/depth2/depth3`
- **concurrent**
  - Execute multiple commands concurrently on windows or *nix systems
  - Example: `sd concurrent "touch this" "del that"`

[npm-badge]: https://img.shields.io/npm/v/@stencil/utils.svg?style=flat-square
[npm-badge-url]: https://www.npmjs.com/package/@stencil/utils
