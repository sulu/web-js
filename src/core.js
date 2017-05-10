var $ = require('jquery');
var BaseComponent = require('./component.js');

/**
 * Web container for all components and services.
 */
var core = core || (function() {
    'use strict';

    return {
        /**
         * Registered services
         * @property services
         * @private
         */
        services: {},

        /**
         * Registered components
         * @property components
         * @private
         */
        components: {},

        /**
         * Started components
         * @property componentInstances
         * @private
         */
        componentInstances: {},

        /**
         * Defines a new service
         * @params {String} name
         * @params {Object} service
         * @return {Object} this
         */
        registerService: function(name, Service) {
            if (!this.services[name]) {
                this.services[name] = Service;
            }
            return this;
        },

        /**
         * Get the service by name
         * @params {String} name
         * @return {Object} service instance
         */
        getService: function(name) {
            var Service = this.services[name] || null;
            if (typeof Service === 'function') {
                Service = this.services[name] = new Service(this);
            }
            return Service;
        },

        /**
         * Extend from the base component class and store the reference
         * @param {String} name - Component blueprint
         * @param {Object} protoProps - Properties of our defined component
         * @return {Object} this
         */
        registerComponent: function(name, protoProps) {
            var parent = BaseComponent;
            var component, Surrogate;
            component = function() {
                parent.apply(this, arguments);
            };
            $.extend(component, parent);
            Surrogate = function() {
                this.constructor = component;
            };
            Surrogate.prototype = parent.prototype;
            component.prototype = new Surrogate();
            $.extend(component.prototype, protoProps);
            component.__super__ = parent.prototype;
            this.components[name] = component;
            return this;
        },

        /**
         * Stats a new component from the component blueprint and returns the reference
         * @param {String} name
         * @param {String} instanceId
         * @param {Object} options
         * @return {Object} component instance
         */
        startComponent: function(name, instanceId, options) {
            options = options || {};
            var Component = this.components[name];
            var instance;
            if (!!Component) {
                instance = new Component(instanceId, options, this);
                this.componentInstances[instanceId] = instance;
            } else {
                throw new Error('Component with the type: ' + name + ' is not defined.');
            }
            return instance;
        },

        /**
         * Stats a new component from the component blueprint and returns the reference
         * @param {Array} components
         * @return {Object} component instance
         */
        startComponents: function(components) {
            var instances = [];

            $.each(components, function(index, component) {
                try {
                    instances[index] = this.startComponent(component.name, component.instanceId, component.options);
                } catch(e) {
                    console.error('Start of component failed: ' + component.instanceId);
                    console.error(e);
                }
            }.bind(this));
            return instances;
        },

        /**
         * Get a Component instance by instanceId
         * @param {String} instanceId - component instance identifier defined with the "startComponent" method
         * @return {Object} component instance
         */
        getComponent: function(instanceId) {
            return this.componentInstances[instanceId] || null;
        },

        /**
         * Facade for destroying a component
         * @param {Object|String} component Could be an instance or the component id
         * @return {Object}
         */
        removeComponent: function(component) {
            if (typeof component === 'string') {
                this.destroyComponent(component);
            } else {
                this.destroyComponent(component.id);
            }
            return this;
        },

        /**
         * Destroys a component and removes its DOM element
         * @param {String} instanceId
         * @private
         */
        destroyComponent: function(instanceId) {
            var instance = this.componentInstances[instanceId];
            if (!!instance) {
                instance.destroy.call(instance);
                delete this.componentInstances[instanceId];
            }
            return this;
        }
    };
})();

module.exports = core;
