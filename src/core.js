/* eslint-disable */
import "babel-polyfill";
import BaseComponent from './component';
import $ from 'jquery';

const singleton = Symbol();
const singletonEnforcer = Symbol();

/**
 * Core-Base Component.
 */
class Core {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot construct singleton.');
        }

        this.registeredComponents = [];
        this.componentInstances = [];
    }

    /**
     * Start Components.
     *
     * @param {string} name
     * @param {string} id
     * @param {Object} options
     */
    startComponent(name, id, options = {}) {
        const Component = this.registeredComponents[name];

        // Check if Component exists.
        if (!Component) {
            throw new Error(`Component with the name "${name}" is not defined!`);
        }

        const instance = new Component(...arguments);

        if (document.readyState === 'complete') {
            instance.postPlaceAt();
        } else {
            $(document).ready(() => instance.postPlaceAt());
        }

        this.componentInstances[id] = instance;

        return instance;
    }

    /**
     * Start Components.
     *
     * @param {BaseComponents} components
     */
    startComponents(components) {
        const instances = [];

        components.forEach(component => {
            try {
                const instance = this.startComponent(component.name, component.id, component.options);
                instances.push(instance);
            } catch(error) {
                console.error('Start of component failed: ' + component.id);
                console.error(error);
            }
        });

        return instances;
    }

    /**
     * Register a new Component and store it in registerd components.
     *
     * @param {string} name
     * @param {BaseComponent} component
     *
     * @return {Core}
     */
    registerComponent(name, component) {
        // Check if component is an instance of "BaseComponent".
        // !component instanceof BaseComponent (in ES2016)
        if (component.__proto__.name !== BaseComponent.name) {
            throw new Error(`"${name}" must be an instance of ${BaseComponent.name}!`);
        }

        // Check if Component is already registered.
        if (this.registeredComponents[name]) {
            throw new Error(`"${name}" already registered! (Be sure that your name is not a js function(e.g. map,…).`);
        }

        this.registeredComponents[name] = component;

        return this;
    }

    /**
     * Returns a instance of Core-Class.
     *
     * @return {Core}
     */
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new Core(singletonEnforcer);
        }

        return this[singleton];
    }

    /**
     * Return a Component-Instance by given name.
     *
     * @param {String} name
     *
     * @return {BaseComponent}
     */
    getComponent(name) {
        return this.componentInstances[name];
    }

    /**
     * Facade for destroying a component.
     *
     * @param {BaseComponent|String} component - Could be an instance or the component id
     *
     * @return {Core}
     */
    removeComponent(component) {
        if (typeof component === 'string') {
            this._destroyComponent(component);
        } else {
            this._destroyComponent(component.id);
        }

        return this;
    }

    /**
     * Destroys a component and removes its DOM element
     *
     * @param {String} id
     *
     * @return {Core}
     * @private
     */
    _destroyComponent(id) {
        const instance = this.componentInstances[id];

        if (instance) {
            instance.destroy();

            delete this.componentInstances[id];
        }

        return this;
    }
}

export default Core.instance;