;(function (undefined) {
    function buildFetchArray(fetch) {
        return Object.keys(fetch).reduce(function(array, key) {
            return array.concat(fetch[key].map(function(lib) {
                return key + '/' + lib;
            }));
        }, []);
    };

    function buildDeps(fetch, local) {
        return fetch.reduce(function(paths, path) {
            //remove .js extension from path and fileName
            if (path.slice(-3) === '.js') {
                path = path.slice(0, -3);
            };

            //get filename from path
            var fileName = path.slice(path.lastIndexOf('/')+1);

            //cut min from moduleName if present
            var moduleName = fileName;
            if (moduleName.slice(-4) === '.min') {
                moduleName = moduleName.slice(0, -4);
            };

            paths[moduleName] = local?('deps/' + fileName):path;

            return paths;
        }, {});
    };

    require(['config'], function(config) {
        config.paths = buildDeps(buildFetchArray(config.fetch));
        require.config(config);
    });
}());