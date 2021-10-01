// Accordion component

'use strict';

module.exports = function Accordion() {
    var accordion = {};

    /**
     * Accordion is build on top of the aria attributes by the w3c example:
     *     https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html
     *
     * @example
     * <div id="accordion">
     *    <section class="collapse">
     *        <h4 id="accordion-title-1">
     *            <button id="accordion-button-1" aria-expanded="false" aria-controls="accordion-body-1">
     *                Header 1
     *            </button>
     *        </h4>
     *
     *        <div id="accordion-body-1" aria-hidden="true" aria-labelledby="accordion-button-1">
     *            Content 1
     *        </div>
     *    </section>
     *
     *    <section class="collapse">
     *        <h4 id="accordion-title-2">
     *            <button id="accordion-button-2" aria-expanded="false" aria-controls="accordion-body-2">
     *                Header 2
     *            </button>
     *        </h4>
     *
     *        <div id="accordion-body-2" aria-hidden="true" aria-labelledby="accordion-button-2">
     *            Content 2
     *        </div>
     *    </section>
     * </div>
     *
     * import Accordion from '@sulu/web/packages/components/accordion/accordion';
     * var component = new Accordion();
     * component.initialize(document.getElementById('accordion'), {});
     *
     * @param {HTMLElement} el
     * @param {object} options
     */
    accordion.initialize = function initialize(el, options) {
        var i;
        var button;

        accordion.el = el;
        accordion.items = [];

        for (i = 0; i < el.children.length; i++) {
            button = el.children[i].querySelector('[aria-expanded][aria-controls]');

            accordion.items.push({
                container: el.children[i],
                button: button,
                body: document.getElementById(button.getAttribute('aria-controls')),
            });
        }

        accordion.modifier = options.modifier || '--open';
        accordion.firstAccordionItemClass = accordion.items[0].container.classList[0] || '';
        accordion.accordionItemActiveClass = accordion.firstAccordionItemClass + accordion.modifier;

        accordion.addClickListenersToAccordionButtons();
    };

    accordion.addClickListenersToAccordionButtons = function addClickListenersToAccordionButtons() {
        accordion.items.forEach((item) => {
            item.button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                accordion.toggle(item);
            });
        });
    };

    /**
     * @param {object} item
     */
    accordion.toggle = function toggle(item) {
        var i;

        // Close other items
        for (i = 0; i < accordion.items.length; i++) {
            if (accordion.items[i].container !== item.container) {
                accordion.items[i].container.classList.remove(accordion.accordionItemActiveClass);
                accordion.items[i].body.setAttribute('aria-hidden', 'true');
                accordion.items[i].button.setAttribute('aria-expanded', 'false');
            }
        }

        // Toggle current item
        item.container.classList.toggle(accordion.accordionItemActiveClass);
        accordion.toggleAttribute(item.button, 'aria-expanded');
        accordion.toggleAttribute(item.body, 'aria-hidden');
    };

    /**
     * @param {HTMLElement} element
     * @param {string} attributeName
     */
    accordion.toggleAttribute = function toggleAttribute(element, attributeName) {
        element.setAttribute(
            attributeName,
            element.getAttribute(attributeName) === 'true'
                ? 'false'
                : 'true'
        );
    };

    return {
        initialize: accordion.initialize,
    };
};
