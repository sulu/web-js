// Container link component

'use strict';

var $ = require('jquery');

module.exports = function ContainerLink() {
    var containerLink = {};

    /**
     * @param {HTMLElement} el
     */
    containerLink.initialize = function initialize(el) {
        containerLink.$el = $(el);

        // Run init functions.
        containerLink.bindEvents();
    };

    containerLink.bindEvents = function() {
        containerLink.$el.click(containerLink.gotoFirstLink);
        containerLink.$el.find('a').click(function(event) {
            event.stopPropogation();
        });
    };

    /**
     * @param {Event} event
     */
    containerLink.gotoFirstLink = function(event) {
        var url = containerLink.$el.find('a').first().attr('href');

        if (event.metaKey || event.ctrlKey) {
            // Open Link in new tab when meta key or ctrl key is pressed.
            window.open(url);

            return;
        }

        // Open Link in window url.
        window.location.href = url;
    };

    return {
        initialize: containerLink.initialize
    };
};

