;(function (undefined) {
    var local = false,
        fetch = [
            'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.17/require.js',
            'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular.js',
            'https://cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady.js',
        ];

    function fileName(path) {
        return path.split('/').slice(-1).pop();
    };

    function removeExt(path) {
        return path.split('.').slice(0, -1).join('.');
    };

    function buildDeps(fetch, local) {
        return fetch.reduce(function(paths, path) {
            var name = removeExt(fileName(path));
            paths[name] = local?('deps/' + name):removeExt(path);
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
