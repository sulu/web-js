declare interface ScrollDirectionOptions {
    upClass?: string;
    downClass?: string;
}

declare interface ScrollDirection {
    initialize(el: HTMLElement, options: ScrollDirectionOptions): void;
    checkPosition(el: HTMLElement): void;
}

declare const ScrollDirection: {
    new (): ScrollDirection;
};

export = ScrollDirection;
