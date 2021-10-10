// Toggle component module

'use strict';

module.exports = function Toggle() {
    var toggle = {};

    /**
     * @example
     * <button id="toggle" class="button">
     *    Lorem ipsum ...
     * </button>
     *
     * import Toggle from '@sulu/web/packages/components/toggle/toggle';
     * var component = new Toggle();
     * component.initialize(document.getElementById('toggle'), {});
     *
     * @param {HTMLElement} el
     * @param {object} options
     */
    toggle.initialize = function initialize(el, options) {
        toggle.el = el;
        toggle.modifier = options.modifier ? options.modifier : '--open';
        toggle.toggleButtonClass = toggle.getFirstClass(toggle.el) + toggle.modifier;

        // Run init functions
        toggle.bindEvents();
    };

    /**
     * @param {HTMLElement} element
     * @returns {string}
     */
    toggle.getFirstClass = function getFirstClass(element) {
        return element.getAttribute('class').split(' ')[0];
    };

    toggle.bindEvents = function bindEvents() {
        toggle.el.addEventListener('click', toggle.toggleClass);
    };

    toggle.toggleClass = function toggleClass() {
        toggle.el.classList.toggle(toggle.toggleButtonClass);
    };

    return {
        initialize: toggle.initialize,
    };
};
