import { Base } from './base';
import type { CustomerInfo } from '../interface';
/**quản lý tương tác giữa widget và nền tảng Chat - Bot Bán Hàng*/
export declare class WidgetCore extends Base {
    #private;
    /**khóa bí mật của widget, dùng để xác thực khi giải mã dữ liệu khách hàng */
    protected _secret_key?: string;
    /** mã truy cập để oauth hoặc giải mã dữ liệu bản cũ*/
    protected _access_token?: string;
    /** mã truy cập mới để oauth hoặc giải mã dữ liệu bản mới */
    protected _partner_token?: string;
    /**nhân viên hiện tại có phải là admin của trang không */
    protected _is_admin?: boolean;
    /**ID của trang đang được chọn */
    protected _page_id?: string;
    /**ID của khách hàng đang được chọn */
    protected _client_id?: string;
    /**ID của tin nhắn đã chọn */
    protected _message_id?: string;
    /**ID của bình luận đã chọn */
    protected _comment_id?: string;
    /**token của chatbot */
    protected _chatbot_token?: string;
    /**lấy ra dữ liệu mã truy cập hiện tại của bản cũ*/
    get access_token(): string | undefined;
    /**lấy ra dữ liệu mã truy cập hiện tại của bản mới */
    get partner_token(): string | undefined;
    /** lấy ra id của khách hàng */
    get client_id(): string | undefined;
    /** lấy ra id của tin nhắn */
    get message_id(): string | undefined;
    /** lấy ra id của bình luận */
    get comment_id(): string | undefined;
    /**nhân viên có phải là admin không */
    get is_admin(): boolean | undefined;
    /**thay đổi giá trị của mã truy cập thủ công */
    set access_token(value: string | undefined);
    /**thay đổi giá trị của mã truy cập mới */
    set partner_token(value: string | undefined);
    /** thay đổi id của khách hàng */
    set client_id(value: string | undefined);
    /** thay đổi id của tin nhắn */
    set message_id(value: string | undefined);
    /** thay đổi id của bình luận */
    set comment_id(value: string | undefined);
    /**khởi động widget chatbox */
    load(secret_key: string): void;
    /**thực hiện xác thực với Bot Bán Hàng */
    oAuth(token_partner?: string): Promise<any>;
    /**
     * giải mã thông tin khách hàng
     * @deprecated dùng sang phương thức getClientInfo
     * */
    decodeClient(): Promise<CustomerInfo>;
    /** giải mã thông tin khách hàng bản mới*/
    getClientInfo(): Promise<CustomerInfo>;
    /**nạp lại access_token mỗi khi thay đổi khách hàng trong trang */
    onEvent(proceed?: Function): void;
}
