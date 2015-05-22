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
        controllers: [
            'controllers/main'
        ],
        config: {
            app: {
                name: 'TemplateApp',
                deps: [
                ],
            },
        }
    };
});
