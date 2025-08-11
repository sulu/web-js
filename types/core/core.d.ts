declare interface Component {
    name: string;
    id: string;
    options: unknown;
}

declare const web: {
    registerService(name: string, service: object): void;
    getService(name: string): object | undefined;
    hasService(name: string): boolean;
    callService(name: string, method: string, args: string): object | undefined;
    callServices(services: Component[]): object[];
    startComponent(name: string, id: string, options: object): object | undefined;
    startComponents(components: Component[]): void;
    hasComponent(name: string): boolean;
    getElement(id: string): HTMLElement | null;
    removeElement(id: string): void;
    getBaseComponent(name: string): object;
    registerComponent(
        name: string,
        component: object,
        defaultOptions?: object
    ): void;
    getComponent(id: string): object | undefined;
    removeComponent(component: object | string): void;
    destroyComponentInstance(id: string): void;
    emitError(): void;
};

export = web;
