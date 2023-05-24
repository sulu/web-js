declare interface Tabs {
    initialize(el: HTMLElement): void;
    bindEvents(): void;
    toggle(item: { button: HTMLElement; body: HTMLElement }): void;
}

declare const Tabs: {
    new (): Tabs;
};

export = Tabs;
