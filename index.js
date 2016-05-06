'use strict';
var       path = require('path'),
            fs = require('fs'),
       Promise = require('pinkie-promise'),
    cb2promise = require('cb2promise'),
     minimatch = require('minimatch'),
           map = require('arr-map');

function splitPath(x) {
	return path.resolve(x || '').split(path.sep);
}
function join(parts) {
	return path.resolve(parts.join(path.sep));
}
function addPath(dir, files){
    return map(files, function(file){
        return path.resolve(dir, file);
    });
}

module.exports = function(glob, opts){
    opts = opts || {};
    var parts = splitPath(opts.cwd);

    return new Promise(function(resolve, reject){
        (function find() {
            var joined = join(parts);
            cb2promise(fs.readdir, joined)
            .then(function(files){
                var match = minimatch.match(addPath(joined, files), glob, { matchBase: true });
                if(match.length > 0){
                    resolve(addPath(joined, match));
                }else if(parts.pop()){
                    find();
                }else{
                    resolve(null);
                }
            })
            .catch(reject);
        })();
    });
};

module.exports.sync = function(glob, opts){
    opts = opts || {};
    var parts = splitPath(opts.cwd);
    var len = parts.length;

    while(len--) {
        var joined = join(parts);
        var files = fs.readdirSync(joined);
        var match = minimatch.match(addPath(joined, files), glob, { matchBase: true });

        if(match.length > 0){
            return addPath(joined, match);
        }

        parts.pop();
    }
    return null;
};
