import { Base } from './base';
import type { CustomerInfo } from '../interface';
/**quản lý tương tác giữa widget và nền tảng Chat - Bot Bán Hàng*/
export declare class WidgetCore extends Base {
    #private;
    /**khóa bí mật của widget, dùng để xác thực khi giải mã dữ liệu khách hàng */
    protected _secret_key?: string;
    /**mã truy cập để oauth hoặc giải mã dữ liệu */
    protected _access_token?: string;
    /**nhân viên hiện tại có phải là admin của trang không */
    protected _is_admin?: boolean;
    /**ID của trang đang được chọn */
    protected _page_id?: string;
    /**ID của khách hàng đang được chọn */
    protected _client_id?: string;
    /**token của chatbot */
    protected _chatbot_token?: string;
    /**lấy ra dữ liệu mã truy cập hiện tại */
    get access_token(): string | undefined;
    /**nhân viên có phải là admin không */
    get is_admin(): boolean | undefined;
    /**thay đổi giá trị của mã truy cập thủ công */
    set access_token(value: string | undefined);
    /**khởi động widget chatbox */
    load(secret_key: string): void;
    /**thực hiện xác thực với Bot Bán Hàng */
    oAuth(token_partner?: string): Promise<any>;
    /**giải mã thông tin khách hàng */
    decodeClient(): Promise<CustomerInfo>;
    /**nạp lại access_token mỗi khi thay đổi khách hàng trong trang */
    onEvent(proceed?: Function): void;
}
