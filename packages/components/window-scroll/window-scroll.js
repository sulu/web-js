// Window scroll component

'use strict';

module.exports = function WindowScroll() {
    var windowScroll = {};

    /**
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
            {
                passive: true
            }
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
        initialize: windowScroll.initialize
    };
};
