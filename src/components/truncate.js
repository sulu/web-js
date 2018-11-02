// Truncate text component module

'use strict';

var $ = require('jquery');

// Extracted from UnderscoreJS
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}

module.exports = function Truncate() {
    var truncate = {};

    truncate.separator = ' ...';
    truncate.debounceDelay = 250;

    truncate.initialize = function initialize($el, options) {
        truncate.$el = $el;

        if (options) {
            if (options.separator) {
                truncate.separator = options.separator;
            }

            if (options.debounceDelay) {
                truncate.debounceDelay = options.debounceDelay;
            }
        }

        truncate.text = truncate.$el.text().trim();
        truncate.$inner = $('<span></span>').text(truncate.text).css('display', 'block');
        truncate.$el.html(truncate.$inner).css('display', 'block');

        truncate.calculateRegex();
        truncate.calculateText();

        $(window).on('resize', debounce(truncate.calculateText, truncate.debounceDelay));
    };

    truncate.calculateRegex = function calculateRegex() {
        var separatorRegex = truncate.separator.split('').map(c => '\\' + c).join('');
        truncate.regex = new RegExp('\\W*\\s(?:\\S*|\\S*' + separatorRegex + ')$');
    };

    truncate.calculateText = function calculateText() {
        truncate.$inner.text(truncate.text);
        var height = truncate.$el.height();
        console.log("Max Height", height);

        while (truncate.$inner.outerHeight() > height) {
            console.log("Computed Height", truncate.$inner.outerHeight());
            truncate.$inner.text(function (index, text) {
                return text.replace(truncate.regex, truncate.separator);
            });
        }
    };

    return {
        initialize: truncate.initialize
    };
};
