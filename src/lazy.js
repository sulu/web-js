// Lazy loader based on webpacke bundle loader: https://github.com/webpack-contrib/bundle-loader

'use strict';

var $ = require('jquery');
var web = require('./core');

/**
 * Web container for all components and services.
 */
var lazy = (function lazy() {
    var lazy = {
        componentRegistry: {},
        serviceRegistry: {},
        deferredComponents: {},
        deferredServices: {}
    };

    /**
     * For initialize the lazy loader we need component and service registry.
     *
     * @param {Object} componentRegistry
     * @param {Object} serviceRegistry
     */
    lazy.initialize = function initialize(componentRegistry, serviceRegistry) {
        lazy.componentRegistry = componentRegistry;
        lazy.serviceRegistry = serviceRegistry;
    };

    /**
     * Start component.
     *
     * @param {Object} component
     */
    lazy.startComponent = function startComponent(component) {
        var module = component.name;
        var exist = lazy.deferredComponents[module];
        lazy.deferredComponents[module] = exist ? exist : $.Deferred();

        lazy.deferredComponents[module].done(function() {
            web.startComponent(component.name, component.id, component.options);
        });

        if (!exist) {
            lazy.loadComponent(module);
        }
    };

    /**
     * Load compnent.
     *
     * @param {String} module
     */
    lazy.loadComponent = function loadComponent(module) {
        lazy.componentRegistry[module](function (file) {
            web.registerComponent(module, file);
            lazy.deferredComponents[module].resolve();
        });
    };

    /**
     * Start service.
     *
     * @param {Object} service
     */
    lazy.startService = function startComponent(service) {
        var module = service.name;
        var exist = lazy.deferredComponents[module];
        lazy.deferredComponents[module] = exist ? exist : $.Deferred();

        lazy.deferredComponents[module].done(function() {
            web.callService(service.name, service.func, service.args);
        });

        if (!exist) {
            lazy.loadService(module);
        }
    };

    /**
     * Load service.
     *
     * @param {String} module
     */
    lazy.loadService = function loadService(module) {
        lazy.serviceRegistry[module](function (file) {
            web.registerComponent(module, file);
            lazy.deferredServices[module].resolve();
        });
    };

    /**
     * Start components.
     *
     * @param {Array} components
     */
    lazy.startComponents = function startComponents(components) {
        for (var i = 0; i < components.length; i++) {
            lazy.startComponent(components[i]);
        }
    };

    /**
     * Start services.
     *
     * @param {Array} services
     */
    lazy.startServices = function startComponents(services) {
        for (var i = 0; i < services.length; i++) {
            lazy.startService(services[i]);
        }
    };

    return {
        initialize: lazy.initialize,
        startComponents: lazy.startComponents,
        startServices: lazy.startServices
    };
})();

module.exports = lazy;
