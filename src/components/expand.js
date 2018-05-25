// Expand trigger component module

'use strict';

var $ = require('jquery');

module.exports = function Expand() {
    var expand = {};

    expand.initialize = function initialize($el, options) {
        // Define necessary component elements, instance $el handed in on initialization
        expand.$el = $el;
        expand.id = $el.attr('id');
        expand.toggleClass = expand.$el.attr('class').split(' ')[0] + '--open';
        expand.$container = options.container ? $('#' + options.container) : $('#' + expand.id + '-container');

        // Run init functions
        expand.bindEvents();
    };

    expand.bindEvents = function bindEvents() {
        expand.$el.on('click', expand.toggle);
    };

    expand.toggle = function toggle() {
        expand.$el.toggleClass(expand.toggleClass);
        expand.$container.toggle();
    };

    return {
        initialize: expand.initialize
    };
};

