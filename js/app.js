/**
 * Angular application module. Should be configured through RequireJS
 * module config. Moved to separate module to have an ability to get
 * the app instance from controller modules.
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
