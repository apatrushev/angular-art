//We need this code to run scripts/fetch.js in node
if (typeof define !== 'function') {
    var define = require('amdefine')(module)
};

define(function() {
    return {
        fetch: {
            'https://cdnjs.cloudflare.com/ajax/libs': [
                'require.js/2.1.17/require.js',
                'angular.js/1.3.15/angular.js',
                'require-domReady/2.0.1/domReady.js',
            ]
        },
        local: true,
        shim: {
            'angular': {
                exports: 'angular',
            },
            'start': {
                deps: [
                    'app',
                    'controllers',
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
    };
});
