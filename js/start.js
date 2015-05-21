/**
 * Base module to bootstrap angular app with requirejs.
 * Application name to start should be passed in require
 * module configuration option 'app'.
 * See more here:
 * http://requirejs.org/docs/api.html#config-moduleconfig
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
