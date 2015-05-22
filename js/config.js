;(function (undefined) {
    var local = true,
        fetch = [
            'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.17/require.js',
            'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular.js',
            'https://cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady.js',
        ];

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

    require.config({
        fetch: fetch,
        local: local,
        paths: buildDeps(fetch, local),
        shim: {
            'angular': {
                exports: 'angular',
            },
            'start': {
                deps: [
                    'app',
                    'controllers/main',
                ],
            },
        },
        config: {
            start: {
                app: 'TemplateApp',
            },
        },
        deps: [
            'start',
        ],
    });
}());
