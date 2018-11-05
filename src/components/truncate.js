// Truncate text component module

'use strict';

var $ = require('jquery');
var debounce = require('../services/debounce');

module.exports = function Truncate() {
    var truncate = {};

    truncate.initialize = function initialize($el, options) {
        truncate.$el = $el;

        truncate.separator = options.separator || ' ...';
        truncate.debounceDelay = options.debounceDelay || 250;

        truncate.text = truncate.$el.text().trim();
        truncate.$inner = $('<span></span>').text(truncate.text).css('display', 'block');
        truncate.$el.html(truncate.$inner).css('display', 'block');

        truncate.calculateRegex();
        truncate.calculateText();

        $(window).on('resize', debounce(truncate.calculateText, truncate.debounceDelay));
    };

    truncate.calculateRegex = function calculateRegex() {
        var separatorRegex = truncate.separator.split('').map(c => '\\' + c).join('');
        truncate.regex = new RegExp('\\W*\\s?(?:\\S*|\\S*' + separatorRegex + ')$');
    };

    truncate.calculateText = function calculateText() {
        var height;

        truncate.$inner.text(truncate.text);
        height = truncate.$el.height();

        while (truncate.$inner.outerHeight() > height) {
            truncate.$inner.text(function(index, text) {
                if (text === truncate.separator) {
                    return '';
                }

                return text.replace(truncate.regex, truncate.separator);
            });
        }
    };

    return {
        initialize: truncate.initialize
    };
};
