/**lớp cha chứa các phương thức hỗ trợ quan trọng */
export declare class Base {
    #private;
    constructor(me?: string);
    /**singleton */
    static getInstance<T extends Base>(...args: any[]): T;
    /**sử dụng để debug khi cần */
    protected debug(...args: any[]): void;
    /**sử dụng để log lỗi */
    protected error(...args: any[]): void;
    /**bật chế độ debug */
    debugOn(): void;
    /**tắt chế độ debug */
    debugOff(): void;
}
