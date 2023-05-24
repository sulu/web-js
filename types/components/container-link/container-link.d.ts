declare interface ContainerLink {
    initialize(el: HTMLElement): void;
    bindEvents(): void;
    gotoFirstLink(event: Event): void;
}

declare const ContainerLink: {
    new (): ContainerLink;
};

export = ContainerLink;
