// Lazy loader based on webpack bundle loader: https://github.com/webpack-contrib/bundle-loader

'use strict';

var $ = require('jquery');
var web = require('./../../core/core');

/**
 * @experimental
 *
 * Web container for all components and services.
 */
var lazy = (function lazy() {
    var lazy = {
        componentRegistry: {},
        serviceRegistry: {},
        deferredComponents: {},
        deferredServices: {},
    };

    /**
     * For initialize the lazy loader we need component and service registry.
     *
     * @param {Object} componentRegistry
     * @param {Object} serviceRegistry
     */
    lazy.registerComponent = function registerComponent(name, component) {
        lazy.componentRegistry[name] = component;
    };

    /**
     * For initialize the lazy loader we need component and service registry.
     *
     * @param {Object} componentRegistry
     * @param {Object} serviceRegistry
     */
    lazy.registerService = function registerService(name, service) {
        lazy.serviceRegistry[name] = service;
    };

    /**
     * Start component.
     *
     * @param {Object} component
     */
    lazy.startComponent = function startComponent(component) {
        var componentName = component.name;
        var exist = lazy.deferredComponents[componentName];
        lazy.deferredComponents[componentName] = exist ? exist : $.Deferred();

        lazy.deferredComponents[componentName].done(function() {
            web.startComponent(component.name, component.id, component.options);
        });

        if (!exist) {
            lazy.loadComponent(componentName);
        }
    };

    /**
     * Load compnent.
     *
     * @param {String} componentName
     */
    lazy.loadComponent = function loadComponent(componentName) {
        lazy.componentRegistry[componentName](function(file) {
            web.registerComponent(componentName, file);
            lazy.deferredComponents[componentName].resolve();
        });
    };

    /**
     * Start service.
     *
     * @param {Object} service
     */
    lazy.startService = function startService(service) {
        var serviceName = service.name;
        var exist = lazy.deferredComponents[serviceName];
        lazy.deferredComponents[serviceName] = exist ? exist : $.Deferred();

        lazy.deferredComponents[serviceName].done(function() {
            web.callService(service.name, service.func, service.args);
        });

        if (!exist) {
            lazy.loadService(serviceName);
        }
    };

    /**
     * Load service.
     *
     * @param {String} module
     */
    lazy.loadService = function loadService(serviceName) {
        lazy.serviceRegistry[serviceName](function(file) {
            web.registerComponent(serviceName, file);
            lazy.deferredServices[serviceName].resolve();
        });
    };

    /**
     * Start components.
     *
     * @param {Array} components
     */
    lazy.startComponents = function startComponents(components) {
        var i;

        for (i = 0; i < components.length; i++) {
            lazy.startComponent(components[i]);
        }
    };

    /**
     * Start services.
     *
     * @param {Array} services
     */
    lazy.startServices = function startServices(services) {
        var i;

        for (i = 0; i < services.length; i++) {
            lazy.startService(services[i]);
        }
    };

    return {
        registerComponent: lazy.registerComponent,
        registerService: lazy.registerService,
        startComponents: lazy.startComponents,
        startServices: lazy.startServices,
    };
})();

module.exports = window.lazy = lazy;
