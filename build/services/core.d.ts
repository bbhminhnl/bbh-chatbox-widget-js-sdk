import { Base } from './base';
import type { CustomerInfo } from '../interface';
export declare class WidgetCore extends Base {
    #private;
    protected readonly _SECRET_KEY: string;
    protected _access_token?: string;
    protected _is_admin?: boolean;
    protected _page_id?: string;
    protected _client_id?: string;
    protected _chatbot_token?: string;
    constructor(secret_key: string);
    get access_token(): string | undefined;
    get is_admin(): boolean | undefined;
    set access_token(value: string | undefined);
    load(): void;
    oAuth(token_partner?: string): Promise<any>;
    decodeClient(): Promise<CustomerInfo>;
    onEvent(proceed?: Function): void;
}
