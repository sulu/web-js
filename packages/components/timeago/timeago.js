// Relative time difference from date to now

'use strict';

var $ = require('jquery');
var timeagoJS = require('timeago.js');

module.exports = function Timeago() {
    var timeago = {};

    /**
     * @param {HTMLElement} el
     * @param {object} options
     * @param {Date} options.date
     */
    timeago.initialize = function initialize(el, options) {
        var date = options.date;
        var locale = document.documentElement.lang;

        $(el).html(timeagoJS.format(date, locale));
    };

    return {
        initialize: timeago.initialize,
    };
};
