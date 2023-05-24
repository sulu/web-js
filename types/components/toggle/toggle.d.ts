declare interface Toggle {
    initialize(el: HTMLElement, options: { modifier?: string }): void;
    bindEvents(): void;
    toggleClass(): void;
}

declare const Toggle: {
    new (): Toggle;
};

export = Toggle;
