/**
 * Angular application module. Moved to separate module to have an
 * ability to get the app instance from controller modules.
 * Params should be passed in require module configuration options.
 * @param {string} app - application name
 * @paran {array} deps - angular deps
 */
define([
    'module',
    'angular',
], function (module, ng) {
    'use strict';

    return ng.module(
    	module.config().name,
    	module.config().deps
    );
});
