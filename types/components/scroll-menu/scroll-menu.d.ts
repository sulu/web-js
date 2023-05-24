declare interface ScrollMenuOptions {
    tolerance?: number;
    upClass?: string;
    downClass?: string;
}

declare interface ScrollMenu {
    initialize(el: HTMLElement, options: ScrollMenuOptions): void;
    checkPosition(el: HTMLElement): void;
}

declare const ScrollMenu: {
    new (): ScrollMenu;
};

export = ScrollMenu;
