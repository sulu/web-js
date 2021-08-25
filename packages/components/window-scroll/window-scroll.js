// Window scroll component

'use strict';

var passiveEvents = require('../../services/passive-events/passive-events');

module.exports = function WindowScroll() {
    var windowScroll = {};

    /**
     * @example
     * <div id="window-scroll" class="Menu">
     *    Lorem ipsum ...
     * </div>
     *
     * import WindowScroll from '@sulu/web/packages/components/window-scroll';
     * var component = new WindowScroll();
     * component.initialize(document.getElementById('window-scroll'), {});
     *
     * @param {HTMLElement} el
     * @param {object} options
     */
    windowScroll.initialize = function initialize(el, options) {
        windowScroll.isTop = true;
        windowScroll.offset = options.offset ? options.offset : 0;
        windowScroll.toggleClass = el.className.split(' ')[0] + '--scroll';
        window.addEventListener(
            'scroll',
            windowScroll.checkPosition.bind(this, el),
            passiveEvents ? {
                passive: true,
            } : false
        );
        windowScroll.checkPosition(el);
    };

    /**
     * @param {HTMLElement} el
     */
    windowScroll.checkPosition = function(el) {
        var isTop = true;

        if (window.pageYOffset > windowScroll.offset) {
            isTop = false;
        }

        if (isTop !== windowScroll.isTop) {
            el.classList[isTop ? 'remove' : 'add'](windowScroll.toggleClass);
            windowScroll.isTop = isTop;
        }
    };

    return {
        initialize: windowScroll.initialize,
    };
};
