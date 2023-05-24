declare function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    wait: number,
    immediate?: boolean
): (...args: Parameters<T>) => void;

export = debounce;
