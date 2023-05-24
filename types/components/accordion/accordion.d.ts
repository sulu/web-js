declare interface AccordionItem {
    container: HTMLElement;
    button: HTMLElement;
    body: HTMLElement;
}

declare interface AccordionOptions {
    modifier?: string;
}

declare interface Accordion {
    initialize(el: HTMLElement, options: AccordionOptions): void;
    addClickListenersToAccordionButtons(): void;
    toggle(item: AccordionItem): void;
    toggleAttribute(element: HTMLElement, attributeName: string): void;
}

declare const Accordion: {
    new (): Accordion;
};

export = Accordion;
