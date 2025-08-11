declare interface LazyComponent {
    name: string;
    id: string;
    options?: unknown;
}

declare interface LazyService {
    name: string;
    func: string;
    args?: unknown;
}

declare interface Lazy {
    registerComponent(name: string, component: object): void;
    registerService(name: string, service: object): void;
    startComponent(component: LazyComponent): void;
    loadComponent(componentName: string): void;
    startService(service: LazyService): void;
    loadService(serviceName: string): void;
    startComponents(components: LazyComponent[]): void;
    startServices(services: LazyService[]): void;
}

declare const lazy: Lazy;

export = lazy;
