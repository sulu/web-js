declare interface WindowScroll {
    initialize(el: HTMLElement, options: { offset?: number }): void;
    checkPosition(el: HTMLElement): void;
}

declare const WindowScroll: {
    new (): WindowScroll;
};

export = WindowScroll;
