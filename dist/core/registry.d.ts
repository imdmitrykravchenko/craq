declare const createRegistry: <T>() => {
    register(key: string, value: T): void;
    has(key: string): boolean;
    get(key: string): T;
    entries(): {
        [key: string]: T;
    };
};
export default createRegistry;
