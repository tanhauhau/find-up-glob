# find-up-glob

<!-- badge -->
[![travis status](https://img.shields.io/travis/tanhauhau/find-up-glob.svg)](https://travis-ci.org/tanhauhau/find-up-glob)
[![npm version](https://img.shields.io/npm/v/find-up-glob.svg)](https://www.npmjs.com/package/find-up-glob)
[![npm download](https://img.shields.io/npm/dm/find-up-glob.svg)](https://www.npmjs.com/package/find-up-glob)
[![david dependency](https://img.shields.io/david/tanhauhau/find-up-glob.svg)]()
[![david dev-dependency](https://img.shields.io/david/dev/tanhauhau/find-up-glob.svg)]()

<!-- endbadge -->

> Find a file by walking up parent directories
>
> Like [find-up](https://github.com/sindresorhus/find-up) but using [minimatch](https://github.com/isaacs/minimatch)

# Installation

```bash
$ npm install --save find-up-glob
```

## Usage

```
/
└── Users
    └── tanhauhau
        ├── unicorn.png
        └── foo
            └── bar
                ├── a.js
                └── b.js
            └── awesome.txt
            └── super.txt
```

```javascript
var findUpGlob = require('find-up-glob');

//asynchronous using promise
findUpGlob('*.js').then(function(files){
    console.log(files)
    //=> ['/Users/tanhauhau/foo/bar/a.js', '/Users/tanhauhau/foo/bar/b.js']
})

//synchronous
var files = findUpGlob.sync('*.txt');
//=> ['/Users/tanhauhau/foo/awesome.txt', '/Users/tanhauhau/foo/super.txt']
```

## API

### findUpGlob(glob, [options])

Returns a promise for the array of filepath or `null`.

### findUpGlob.sync(glob, [options])

Returns an array of filepath or `null`.

**glob**  
Type: `string`  
Glob pattern for filename matching, using [minimatch](https://github.com/isaacs/minimatch) to match

**options**  
**`cwd`**  
Type: `string`  
Default: `process.cwd()`  
Directory to start from.  

## Caveat

To match a parent folder you should use:  
`findUpGlob('**/bar/*.js')` instead of `findUpGlob('/bar/*.js')`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

# License
MIT
