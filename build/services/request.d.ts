import { Base } from './base';
import { DOMAIN } from '../constant';
import type { RawAxiosRequestHeaders } from 'axios';
export declare class Request extends Base {
    #private;
    constructor(host: keyof typeof DOMAIN, headers?: RawAxiosRequestHeaders);
    set headers(value: RawAxiosRequestHeaders | undefined);
    post(path: string, body?: any): Promise<any>;
}
export declare const APP_SERVER: Request;
export declare const WIDGET_SERVER: Request;
export declare const CHATBOT_SERVER: Request;
