import { Base } from './base';
import { DOMAIN } from '../constant';
import type { RawAxiosRequestHeaders } from 'axios';
/**quản lý việc gọi http API đến Bot Bán Hàng */
export declare class Request extends Base {
    #private;
    constructor(host: keyof typeof DOMAIN, headers?: RawAxiosRequestHeaders);
    /**thay đổi giá trị header mặc định */
    set headers(value: RawAxiosRequestHeaders | undefined);
    /**gọi API theo phương thức POST */
    post(path: string, body?: any): Promise<any>;
}
/**máy chủ chính */
export declare const APP_SERVER: Request;
/**máy chủ phụ */
export declare const WIDGET_SERVER: Request;
/**máy chủ chatbot */
export declare const CHATBOT_SERVER: Request;
