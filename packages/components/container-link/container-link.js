// Container link component

'use strict';

var $ = require('jquery');

module.exports = function ContainerLink() {
    var containerLink = {};

    /**
     * @example
     * <div id="container-link" class="menu">
     *    Lorem ipsum ...
     *
     *    <a href="#1">Link 1</a> <!-- Click on container will open this link -->
     *    <a href="#2">Link 2</a>
     * </div>
     *
     * import ContainerLink from '@sulu/web/packages/components/container-link';
     * var component = new ContainerLink();
     * component.initialize(document.getElementById('container-link'), {});
     *
     * @see scss/tools/container-link/_container-link.scss for css only solution
     *
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
        initialize: containerLink.initialize,
    };
};

