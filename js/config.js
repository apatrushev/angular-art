;(function (undefined) {
    var fetch = [
        'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.17/require.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular.js',
        'https://cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady.js',
    ];

    function fileName(path) {
        var filename = path.split('/').slice(-1).pop(); //get filename
        return filename.split('.').slice(0, -1).join('.') //remove extension
    };

    function buildDeps(fetch) {
        return fetch.reduce(function(paths, path) {
            var name = fileName(path);
            paths[name] = 'deps/' + name;
            return paths;
        }, {});
    };

    require.config({
        fetch: fetch,
        paths: buildDeps(fetch),
        shim: {
            'angular': {
                exports: 'angular',
            },
            'start': {
                deps: [
                    'app',
                    'controllers/main'
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
