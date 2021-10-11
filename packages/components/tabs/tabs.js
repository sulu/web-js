// Tab component

'use strict';

module.exports = function Tabs() {
    var tabs = {};

    /**
     * Tabs is build on top of the aria attributes by the w3c example:
     *     https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-2/tabs.html
     *
     * @example
     * <div id="tabs" class="tabs">
     *   <div role="tablist" aria-label="Entertainment">
     *     <button role="tab"
     *             aria-selected="true"
     *             aria-controls="nils-tab"
     *             id="nils">
     *       Nils Frahm
     *     </button>
     *     <button role="tab"
     *             aria-selected="false"
     *             aria-controls="agnes-tab"
     *             id="agnes"
     *             tabindex="-1">
     *       Agnes Obel
     *     </button>
     *     <button role="tab"
     *             aria-selected="false"
     *             aria-controls="complexcomplex"
     *             id="complex"
     *             tabindex="-1">
     *       Joke
     *     </button>
     *   </div>
     *   <div tabindex="0"
     *        role="tabpanel"
     *        id="nils-tab"
     *        aria-labelledby="nils">
     *     <p>
     *       Nils Frahm is a German musician, composer and record producer based in Berlin.
     *       He is known for combining classical and electronic music and for an unconventional
     *       approach to the piano in which he mixes a grand piano, upright piano, Roland Juno-60,
     *       Rhodes piano, drum machine, and Moog Taurus.
     *     </p>
     *   </div>
     *   <div tabindex="0"
     *        role="tabpanel"
     *        id="agnes-tab"
     *        aria-labelledby="agnes"
     *        hidden="">
     *     <p>
     *       Agnes Caroline Thaarup Obel is a Danish singer/songwriter. Her first album, Philharmonics,
     *       was released by PIAS Recordings on 4 October 2010 in Europe. Philharmonics was certified
     *       gold in June 2011 by the Belgian Entertainment Association (BEA) for sales of 10,000 Copies.
     *     </p>
     *   </div>
     *   <div tabindex="0"
     *        role="tabpanel"
     *        id="complexcomplex"
     *        aria-labelledby="complex"
     *        hidden="">
     *     <p>
     *       Fear of complicated buildings:
     *     </p>
     *     <p>
     *       A complex complex complex.
     *     </p>
     *   </div>
     * </div>
     *
     * @param {HTMLElement} el
     */
    tabs.initialize = function initialize(el) {
        tabs.items = [];
        el.querySelector('[role=tablist]').querySelectorAll('[role=tab]').forEach(function(item) {
            tabs.items.push({
                button: item,
                body: document.getElementById(item.getAttribute('aria-controls')),
            });
        });

        tabs.bindEvents();
    };

    tabs.bindEvents = function bindEvents() {
        tabs.items.forEach((item, index) => {
            item.button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                tabs.toggle(item);
            });

            item.button.addEventListener('keydown', (event) => {
                var newIndex = null;

                if (event.keyCode === 37 || event.keyCode === 38) { // Left key and up key
                    newIndex = index - 1;
                } else if (event.keyCode === 39 || event.keyCode === 40) { // Right key and down key
                    newIndex = index + 1;
                } else if (event.keyCode === 35) { // End key
                    newIndex = tabs.items.length - 1;
                } else if (event.keyCode === 36) { // Home key
                    newIndex = 0;
                }

                if (tabs.items[newIndex]) {
                    tabs.items[newIndex].button.focus();
                }
            });
        });
    };

    /**
     * @param {object} item
     */
    tabs.toggle = function toggle(item) {
        var i;

        // Close other items
        for (i = 0; i < tabs.items.length; i++) {
            if (tabs.items[i] !== item) {
                tabs.items[i].body.setAttribute('hidden', true);
                tabs.items[i].button.setAttribute('aria-selected', 'false');
                tabs.items[i].button.setAttribute('tabindex', '-1');
            }
        }

        // Toggle current item
        item.button.setAttribute('aria-selected', 'true');
        item.button.removeAttribute('tabindex');
        item.body.removeAttribute('hidden');
    };

    return {
        initialize: tabs.initialize,
    };
};
