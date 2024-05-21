export declare class Base {
    #private;
    constructor(me?: string);
    static getInstance<T extends Base>(...args: any[]): T;
    protected debug(...args: any[]): void;
    protected error(...args: any[]): void;
    debugOn(): void;
    debugOff(): void;
}
