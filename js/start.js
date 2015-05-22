/**
 * Base module to bootstrap angular app with requirejs.
 * @param {string} app - Application name to bootstrap.
 */
define([
    'module',
    'angular',
    'domReady!',
], function(module, ng, document) {
    'use strict';
    /**
     * This code will be called only after DOMContentLoaded
     * Thanks to domReady! (espesially to exclamation mark)
     * See more here:
     * http://requirejs.org/docs/api.html#pageload
     */

    ng.bootstrap(document, [module.config().app]);
});
