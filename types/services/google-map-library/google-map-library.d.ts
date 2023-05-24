declare namespace GoogleMapLibrary {
    interface Library {
        key: string;
        promise: Promise<unknown> | null;
        setKey(key: string): void;
        getKey(): string;
        load(): Promise<unknown>;
    }
}

declare const GoogleMapLibrary: GoogleMapLibrary.Library;

export = GoogleMapLibrary;
