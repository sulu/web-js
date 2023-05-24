declare interface ExpandOptions {
    closeOnEsc?: boolean;
    container?: string;
    modifier?: string;
}

declare interface Expand {
    initialize(el: HTMLElement, options: ExpandOptions): void;
    getFirstClass(element: HTMLElement): string;
    bindEvents(): void;
    toggle(): void;
    close(): void;
}

declare const Expand: {
    new (): Expand;
};

export = Expand;
