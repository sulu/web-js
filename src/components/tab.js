// Tab component.

'use strict';

var $ = require('jquery');

module.exports = function Tab() {
    var tab = {};

    /**
     * @param {jQuery} $el
     * @param {object} options
     */
    tab.initialize = function initialize($el, options) {
        tab.$el = $el;
        tab.$tabs = $el.children();
        tab.activeTabClass = tab.$tabs.first().attr('class').split(' ')[0] + '--active';
        tab.$container = options.container ? $('#' + options.container) : $('#' + $el.attr('id') + '-container');
        tab.$containers = tab.$container.children();
        tab.hash = false;

        if (options.hash) {
            tab.hash = true;
        }

        tab.$tabs.each(function(index, el) {
            var $tab = $(el);
            $tab.click(function() {
                this.changeTab($tab, index);
            }.bind(this));

            if (tab.hash && window.location.hash && window.location.hash === '#' + $tab.data('name')) {
                $tab.click();
            }
        }.bind(this));
    };

    /**
     * @param {jQuery} $el
     * @param {int} index
     */
    tab.changeTab = function changeTab($el, index) {
        var hashName = $el.data('name');
        this.$tabs.attr('disabled', false);
        $el.attr('disabled', true);
        this.$tabs.removeClass(this.activeTabClass);
        $el.addClass(this.activeTabClass);
        this.$containers.hide();
        this.$containers.eq(index).show();

        if (tab.hash) {
            window.location.hash = hashName ? hashName : '';
        }
    };

    return {
        initialize: tab.initialize
    };
};

