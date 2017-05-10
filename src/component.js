'use strict';

var $ = require('jquery');

/**
 * @class Component
 * @constructor
 */
function Component(id, options, web) {

    /**
     * @property {String} id
     */
    this.id = id;

    /**
     * @property {Object} $el
     */
    this.$el = $('#' + id);

    /**
     * @property {Object} options
     */
    this.options = options || {};

    /**
     * Reference to the web instance container
     * @property {Object} web
     */
    this.web = web;

    /**
     * Call the component initialize method
     * @property {Boolean} initialized
     */
    this.initialized = this.initialize.apply(this, arguments);
}

/**
 * Dummy initialize method
 * @method initialize
 */
Component.prototype.initialize = $.noop;

/**
 * Dummy destroy method
 * @method destroy
 */
Component.prototype.destroy = $.noop;
module.exports = Component;
