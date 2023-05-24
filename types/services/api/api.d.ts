declare interface Api {
    get(uri: string, data?: object): Promise<unknown>;
    post(uri: string, data?: object): Promise<unknown>;
    put(uri: string, data?: object): Promise<unknown>;
    delete(uri: string, data?: object): Promise<unknown>;
}

declare const api: Api;

export = api;
