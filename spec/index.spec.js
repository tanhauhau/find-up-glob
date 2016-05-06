var path = require('path'),
 Promise = require('pinkie-promise'),
    find = require('../index.js');

function resolve(file){
    return path.resolve(__dirname, file);
}

describe('Find Up Glob', function(){
    var cwd = { cwd: resolve('./fixture/foo/bar') };
    var expectations = {
        '*.js': [resolve('./fixture/foo/bar/tee.js'), resolve('./fixture/foo/bar/too.js')],
        'tee.*': [resolve('./fixture/foo/bar/tee.js'), resolve('./fixture/foo/bar/tee.md')],
        't*.*': [resolve('./fixture/foo/bar/tee.js'), resolve('./fixture/foo/bar/tee.md'), resolve('./fixture/foo/bar/too.js')],
        '**/*.js': [resolve('./fixture/foo/bar/tee.js'), resolve('./fixture/foo/bar/too.js')],
        '**/tee.*': [resolve('./fixture/foo/bar/tee.js'), resolve('./fixture/foo/bar/tee.md')],
        '**/t*.*': [resolve('./fixture/foo/bar/tee.js'), resolve('./fixture/foo/bar/tee.md'), resolve('./fixture/foo/bar/too.js')],
        '*.yml': [resolve('./fixture/foo/yo.yml')],
        'yo.yml': [resolve('./fixture/foo/yo.yml')],
        'yo.*': [resolve('./fixture/foo/yo.yml')],
        '**/yo.*': [resolve('./fixture/foo/yo.yml')],
        'i*e.*': [resolve('./fixture/ignore.txt')],
        '*e.*': [resolve('./fixture/foo/bar/tee.js'), resolve('./fixture/foo/bar/tee.md')],
        'a.*': null
    };

    for(var key in expectations){
        it('async ' + key, function(done){
            var promise = find(key, cwd);
            expect(promise).toEqual(jasmine.any(Promise));
            promise.then(function(files){
                expect(files).toEqual(expectations[key]);
                done();
            })
            .catch(function(e){
                expect(e).toBe('No error');
                done();
            })
        });
        it('sync ' + key, function(){
            expect(find.sync(key, cwd)).toEqual(expectations[key]);
        });
    }
});
