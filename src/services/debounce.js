// Debounce function

'use strict';

/**
 * Extracted from UnderscoreJS
 *
 * @ignore
 */
module.exports = function debounce(func, wait, immediate) {
    var timeout;

    return function() {
        var context = this;
        var args = arguments;

        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;

            if (!immediate) {
                func.apply(context, args);
            }
        }, wait);

        if (immediate && !timeout) {
            func.apply(context, args);
        }
    };
};
