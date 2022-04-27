// Truncate text component module

'use strict';

var $ = require('jquery');
var debounce = require('../../services/debounce/debounce');

module.exports = function Truncate() {
    var truncate = {};

    /**
     * @example
     * <div id="truncate" style="overflow: hidden; line-height: 20px; max-height: 60px;">
     *    Lorem ipsum ...
     * </div>
     *
     * import Truncate from '@sulu/web/packages/components/truncate';
     * var component = new Truncate();
     * component.initialize(document.getElementById('truncate'), {});
     *
     * @param {HTMLElement} el
     * @param {object} options
     */
    truncate.initialize = function initialize(el, options) {
        truncate.$el = $(el);

        // Set default options if no custom options are defined
        truncate.separator = options.separator || ' ...';
        truncate.debounceDelay = options.debounceDelay || 250;

        truncate.text = truncate.$el.text().trim();
        truncate.$inner = $('<span></span>').text(truncate.text).css('display', 'block');
        truncate.$el.html(truncate.$inner).css('display', 'block');

        truncate.calculateRegex();
        truncate.calculateText();

        $(window).on('load resize', debounce(truncate.calculateText, truncate.debounceDelay));
    };

    /**
     * Calculate regex based on the separator.
     */
    truncate.calculateRegex = function calculateRegex() {
        var separatorRegex = truncate.separator.split('').map(c => '\\' + c).join('');
        truncate.regex = new RegExp('\\W*\\s?(?:\\S*|\\S*' + separatorRegex + ')$');
    };

    /**
     * Calculate output text based on the element's height.
     */
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
        initialize: truncate.initialize,
    };
};
