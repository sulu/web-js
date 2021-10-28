// Scroll menu component

'use strict';

var passiveEvents = require('../../services/passive-events/passive-events');

module.exports = function ScrollMenu() {
    var scrollMenu = {};

    /**
     * @example
     * <div id="scroll-menu" class="menu">
     *    Lorem ipsum ...
     * </div>
     *
     * import ScrollMenu from '@sulu/web/packages/components/scroll-menu';
     * var component = new ScrollMenu();
     * component.initialize(document.getElementById('scroll-menu'), {});
     *
     * @param {HTMLElement} el
     * @param {object} options
     */
    scrollMenu.initialize = function initialize(el, options) {
        scrollMenu.direction = null;
        scrollMenu.offset = 0;
        scrollMenu.tolerance = options.tolerance || 0;
        scrollMenu.upClass = options.upClass
            ? options.upClass
            : el.className.split(' ')[0] + '--scroll-up';
        scrollMenu.downClass = options.downClass
            ? options.downClass
            : el.className.split(' ')[0] + '--scroll-down';
        window.addEventListener(
            'scroll',
            scrollMenu.checkPosition.bind(this, el),
            passiveEvents ? {
                passive: true,
            } : false
        );
        scrollMenu.checkPosition(el);
    };

    /**
     * @param {HTMLElement} el
     */
    scrollMenu.checkPosition = function(el) {
        var direction = 'up';
        var oldOffset = scrollMenu.offset;
        var newOffset = window.pageYOffset;

        scrollMenu.offset = newOffset;

        if (0 >= newOffset) {
            scrollMenu.direction = null;
            el.classList.remove(scrollMenu.upClass);
            el.classList.remove(scrollMenu.downClass);

            return;
        }

        if (newOffset > oldOffset) {
            direction = 'down';
        }

        if (newOffset <= el.offsetTop + el.offsetHeight) {
            return;
        }

        if (scrollMenu.direction === direction) {
            return;
        }

        if (scrollMenu.tolerance && Math.abs(newOffset - oldOffset) < scrollMenu.tolerance) {
            return;
        }

        scrollMenu.direction = direction;

        if ('down' === direction) {
            el.classList.remove(scrollMenu.upClass);
            el.classList.add(scrollMenu.downClass);
        } else {
            el.classList.remove(scrollMenu.downClass);
            el.classList.add(scrollMenu.upClass);
        }
    };

    return {
        initialize: scrollMenu.initialize,
    };
};
