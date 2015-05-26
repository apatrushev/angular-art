/**
 * Main module configuring RequireJS using config.js.
 * Config format slightly differernt from base RequireJS
 * format (mostly in place of paths and adding some mandatory things).
 * Instead of paths you should provide fetch attribute:
 *  - just list of urls
 *  - mapping with keys as cdn base url's and values as array of libs
 */
;(function (undefined) {
    'use strict';

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
        config.fetch = buildFetchArray(config.fetch);

        if (config.paths !== undefined) {
            var deps = buildDeps(config.fetch, config.local);
            for(var k in deps) {
                config.paths[k] = deps[k];
            };
        } else {
            config.paths = buildDeps(config.fetch, config.local);
        };

        config.shim = config.shim || {};
        config.shim.angular = {
            exports: 'angular',
        };

        //provide application name to start module
        config.config.start = {
            app: config.config.app.name
        };

        //start module is main entry-point
        config.deps = [
            'start'
        ];

        //it depend's on app module
        config.shim.start = {
            deps: [
                'app',
            ],
        };

        //set application mods dependency on angular
        var mods = config.config.app['bad-mods'];
        if (mods !== undefined) {
            mods.forEach(function(val) {
                config.shim[val] = config.shim[val] || {};
                config.shim[val].deps = config.shim[val].deps || [];
                config.shim[val].deps.push('angular');
                config.shim.start.deps.push(val);
            });
        };

        //...and controller modules
        var startDeps = config.shim.start.deps;
        startDeps.push.apply(startDeps, config.config.app.mods);

        //fire!!!
        require.config(config);
    });
}());
