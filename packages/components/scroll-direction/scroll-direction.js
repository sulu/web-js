// Scroll direction component

'use strict';

var passiveEvents = require('../../services/passive-events/passive-events');

module.exports = function ScrollDirection() {
    var scrollDirection = {};

    /**
     * @example
     * <div id="scroll-direction" class="menu">
     *    Lorem ipsum ...
     * </div>
     *
     * import ScrollDirection from '@sulu/web/packages/components/scroll-direction';
     * var component = new ScrollDirection();
     * component.initialize(document.getElementById('scroll-direction'), {});
     *
     * @param {HTMLElement} el
     * @param {object} options
     */
    scrollDirection.initialize = function initialize(el, options) {
        scrollDirection.direction = null;
        scrollDirection.offset = 0;
        scrollDirection.upClass = options.upClass
            ? options.upClass
            : el.className.split(' ')[0] + '--scroll-up';
        scrollDirection.downClass = options.downClass
            ? options.downClass
            : el.className.split(' ')[0] + '--scroll-down';
        window.addEventListener(
            'scroll',
            scrollDirection.checkPosition.bind(this, el),
            passiveEvents ? {
                passive: true,
            } : false
        );
        scrollDirection.checkPosition(el);
    };

    /**
     * @param {HTMLElement} el
     */
    scrollDirection.checkPosition = function(el) {
        var direction = 'up';

        if (window.pageYOffset > scrollDirection.offset) {
            direction = 'down';
        }

        scrollDirection.offset = window.pageYOffset;
        if (0 >= window.pageYOffset) {
            scrollDirection.direction = null;
            el.classList.remove(scrollDirection.upClass);
            el.classList.remove(scrollDirection.downClass);

            return;
        }

        if (scrollDirection.direction === direction) {
            return;
        }

        if ('down' === direction) {
            el.classList.remove(scrollDirection.upClass);
            el.classList.add(scrollDirection.downClass);
        } else {
            el.classList.remove(scrollDirection.downClass);
            el.classList.add(scrollDirection.upClass);
        }
    };

    return {
        initialize: scrollDirection.initialize,
    };
};
