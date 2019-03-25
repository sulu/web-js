// Expand trigger component module
'use strict';

var $ = require('jquery');

module.exports = function Expand() {
    var expand = {};

    /**
     * @param {HTMLElement} el
     * @param {object} options
     */
    expand.initialize = function initialize(el, options) {
        // Define necessary component elements, instance $el handed in on initialization
        expand.$el = $(el);
        expand.id = expand.$el.attr('id');
        expand.closeOnEsc = options.closeOnEsc ? options.closeOnEsc : false;
        expand.$container = options.container ? $('#' + options.container) : $('#' + expand.id + '-container');
        expand.modifier = options.modifier ? options.modifier : '--open';
        expand.toggleButtonClass = expand.getFirstClass(expand.$el) + expand.modifier;
        expand.toggleContainerClass = expand.getFirstClass(expand.$container) + expand.modifier;

        // Run init functions
        expand.bindEvents();
    };

    /**
     * @param {jQuery} $element
     */
    expand.getFirstClass = function getFirstClass($element) {
        return $element.attr('class').split(' ')[0];
    };

    expand.bindEvents = function bindEvents() {
        expand.$el.on('click', expand.toggle);

        if (expand.closeOnEsc) {
            $(document).keyup(function(event) {
                if (event.keyCode === 27) {
                    expand.close();
                }
            });
        }
    };

    expand.toggle = function toggle() {
        expand.$el.toggleClass(expand.toggleButtonClass);
        expand.$container.toggleClass(expand.toggleContainerClass);
    };

    expand.close = function close() {
        expand.$el.removeClass(expand.toggleButtonClass);
        expand.$container.removeClass(expand.toggleContainerClass);
    };

    return {
        initialize: expand.initialize
    };
};
