// Expand trigger component module

'use strict';

module.exports = function Expand() {
    var expand = {};

    /**
     * @example
     * <button id="expand" class="button">
     *    Lorem ipsum ...
     * </button>
     *
     * <div id="expand-container" class="container">
     *     Container
     * </div>
     *
     * import Expand from '@sulu/web/packages/components/expand';
     * var component = new Expand();
     * component.initialize(document.getElementById('expand'), {});
     *
     * @param {HTMLElement} el
     * @param {object} options
     */
    expand.initialize = function initialize(el, options) {
        expand.el = el;
        expand.id = el.id;
        expand.closeOnEsc = options.closeOnEsc ? options.closeOnEsc : false;
        expand.container = options.container
            ? document.getElementById(options.container)
            : document.getElementById(expand.id + '-container');
        expand.modifier = options.modifier ? options.modifier : '--open';
        expand.toggleButtonClass = expand.getFirstClass(expand.el) + expand.modifier;
        expand.toggleContainerClass = expand.getFirstClass(expand.container) + expand.modifier;

        // Run init functions
        expand.bindEvents();
    };

    /**
     * @param {HTMLElement} element
     * @returns {string}
     */
    expand.getFirstClass = function getFirstClass(element) {
        return element.getAttribute('class').split(' ')[0];
    };

    expand.bindEvents = function bindEvents() {
        expand.el.addEventListener('click', expand.toggle);

        if (expand.closeOnEsc) {
            document.addEventListener('keyup', function(event) {
                if (event.keyCode === 27) {
                    expand.close();
                }
            });
        }
    };

    expand.toggle = function toggle() {
        expand.el.classList.toggle(expand.toggleButtonClass);
        expand.container.classList.toggle(expand.toggleContainerClass);
    };

    expand.close = function close() {
        expand.el.classList.remove(expand.toggleButtonClass);
        expand.container.classList.remove(expand.toggleContainerClass);
    };

    return {
        initialize: expand.initialize,
    };
};
