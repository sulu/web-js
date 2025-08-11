declare interface Truncate {
    initialize(el: HTMLElement, options: { separator?: string, debounceDelay?: number }): void;
    calculateRegex(): void;
    calculateText(): void;
}

declare const Truncate: {
    new (): Truncate;
};

export = Truncate;
