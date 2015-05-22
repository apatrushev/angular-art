var fs = require('fs'),
    path = require('path'),
    http = require('http'),
    https = require('https'),
    mkdirp = require('mkdirp');
require('String.prototype.startsWith');

//dirty hack to be able to import web mods
var originalRequire = require;
require = function(modules, callback) {
    if (Array.isArray(modules)) {
        var result = modules.map(function(mod) {
            var defined_function = undefined;
            var define = function(f) {
                defined_function = f;
            };
            eval(fs.readFileSync('js/' + mod + '.js')+'');
            if (defined_function !== undefined) {
                callback(defined_function());
            };
        });
    } else {
        return originalRequire(modules);
    }
};

require.config = function(params) {
    var deps_dir = 'js/deps';
    mkdirp.sync(deps_dir);
    params.fetch.forEach(function(filepath) {
        var filename = path.basename(filepath);
        if (params.local || filename === 'require.js') {
            var writer = fs.createWriteStream(path.join(deps_dir, filename));
            if (filepath.startsWith('http://')) {
                http.request(filepath, function(response) {
                    response.pipe(writer);
                }).end();
            } else if (filepath.startsWith('https://')) {
                https.request(filepath, function(response) {
                    response.pipe(writer);
                }).end();
            } else {
                var reader = fs.createReadStream(filepath);
                reader.pipe(writer);
            };
        };
    });
};

//we cannot use require here because we need 'our require inside'
require(['main']);
