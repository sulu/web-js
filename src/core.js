// Application Sandbox

'use strict';

var $ = require('jquery');

/**
 * Web container for all components and services.
 */
var web = (function web() {
    /**
     * Declare & define web and private variables
     * @private
     */
    var web = {};
    var services = {};
    var components = {};
    var componentInstances = {};

    // ------- SERVICE HANDLING -------

    /**
     * Define a new service
     * @method registerService
     * @param {String} name
     * @param {Object} service
     */
    web.registerService = function registerService(name, service) {
        if (typeof services[name] === 'undefined') {
            services[name] = service;
        }
    };

    /**
     * Get the service by name
     * @param {String} name
     * @method getService
     * @return {Object} service interface
     */
    web.getService = function getService(name) {
        // Service not registered
        if (!web.hasService(name)) {
            web.emitError('Service with the name: ' + name + ' is not registered.');

            return;
        }

        return services[name];
    };

    /**
     * Call a service method by specified parameters
     * @param {string} name
     * @param {string} method
     * @param {string} args
     * @method callService
     * @return {Object} service function return value
     */
    web.callService = function callService(name, method, args) {
        var service = web.getService(name);

        if (!service) {
            return;
        }

        var serviceMethod = service[method];

        return serviceMethod(args);
    };

    /**
     * Checks if a service with this name exist
     * @param {String} name
     * @method hasService
     */
    web.hasService = function hasService(name) {
        return (typeof services[name] !== 'undefined');
    };

    /**
     * Call services functions with specified parameters
     * @param {Array} services
     * @method callServices
     * @return {Array} results
     */
    web.callServices = function callServices(services) {
        var results = [];

        // Cycle through registered services and call the battery of methods with args
        services.forEach(function(service) {
            results.push(web.callService(service.name, service.func, service.args));
        });

        return results;
    };

    // ------- COMPONENT HANDLING -------

    /**
     * Starts a new component from the component blueprint
     * @param {String} name
     * @param {String} id
     * @param {Object} options
     * @method startComponent
     */
    web.startComponent = function startComponent(name, id, options) {
        var instance;
        var Component;

        // Check if component type is available
        if (!web.hasComponent(name)) {
            web.emitError('Component with the type ' + name + ' is not registered.');

            return;
        }

        // Instantiate object from base component and init it
        Component = web.getBaseComponent(name);
        instance = new Component();
        instance.initialize(web.getElement(id), options);

        // Add component instance to registry
        componentInstances[id] = instance;
    };

    /**
     * Checks if a component with this name exist
     * @param {String} name
     * @method hasComponent
     */
    web.hasComponent = function hasComponent(name) {
        return (typeof components[name] !== 'undefined');
    };

    /**
     * Get the component dom element.
     * @param {String} id
     * @return {jQuery|HTMLElement}
     * @method getElement
     * @private
     */
    web.getElement = function(id) {
        return $('#' + id)
    };

    /**
     * Get the base component by type name
     * @method getBaseComponent
     * @param {String} name
     * @return {Object}
     */
    web.getBaseComponent = function getBaseComponent(name) {
        return components[name];
    };

    /**
     * Get a base component from the Component Factory and enrich it
     * with custom component properties
     * @param {String} name
     * @param {Object} component
     * @method registerComponent
     */
    web.registerComponent = function registerComponent(name, component) {
        if (typeof component === 'object') {
            // When component is a object create function to allow new on it.

            var instance = function() {};

            $.extend(instance.prototype, component);

            components[name] = instance;

            return;
        }

        components[name] = component;
    };

    /**
     * Get a Component instance by id
     * @param {String} id component instance identifier defined with the ’startComponent’ method
     * @method getComponent
     * @return {Object} component instance
     */
    web.getComponent = function getComponent(id) {
        if (typeof componentInstances[id] === 'undefined') {
            web.emitError('Component instance with id ' + id + ' not found.');

            return;
        }

        return componentInstances[id];
    };

    /**
     * Facade for destroying a component
     * @param {Object|String} component Could be an instance or the component id
     * @method removeComponent
     * @return {Object}
     */
    web.removeComponent = function removeComponent(component) {
        if (typeof component === 'string') {
            web.destroyComponent(component);

            return;
        }

        web.destroyComponent(component.id);
    };

    /**
     * Destroys a component and removes its DOM element
     * @param {String} id
     * @method destroyComponent
     * @private
     */
    web.destroyComponentInstance = function destroyComponentInstance(id) {
        if (typeof componentInstances[id] === 'undefined') {
            web.emitError('Component with id ' + id + ' could not be destroyed, it was not found.');

            return;
        }

        // Calls pre-destroy function of component
        if (typeof componentInstances[id].preDestroy === 'function') {
            componentInstances[id].preDestroy();
        }

        // Remove DOM element of component instance
        web.removeElement(id);

        // Delete instance from our registry
        delete componentInstances[id];
    };

    /**
     * Removes its DOM element
     * @param {String} id
     * @method removeElement
     * @private
     */
    web.removeElement = function removeElement(id) {
        web.getElement(id).remove();
    };

    /**
     * Starts components instantiation from the registry
     * @param {Array} components
     * @method startComponents
     */
    web.startComponents = function startComponents(components) {
        components.forEach(function(component) {
            try {
                web.startComponent(component.name, component.id, component.options);
            } catch (error) {
                web.emitError('Component start failed for: ' + component.id + ' with ' + error);
            }
        });
    };

    /**
     * Handle error messages
     * @method emitError
     * @param {String} message
     */
    web.emitError = function emitError(message) {
        throw Error(message);
    };

    return web;
})();

module.exports = window.web = web;
