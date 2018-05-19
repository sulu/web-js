// Container link component.

'use strict';

module.exports = function ContainerLink() {
    var containerLink = {};
    
    /**
     * @param {jQuery} $el
     */
    containerLink.initialize = function initialize($el) {
        containerLink.$el = $el;

        // Run init functions.
        containerLink.bindEvents();
    };

    containerLink.bindEvents = function() {
        containerLink.$el.click(containerLink.gotoFirstLink);
        containerLInk.$el.find('a').click(function() {
            event.stopPropogation();
        });
    };

    /**
     * @param {Event} event
     */
    containerLink.gotoFirstLink = function(event) {
        var url = containerLink.$el.find('a').first().attr('href');

        if (e.metaKey || e.ctrlKey) {
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

