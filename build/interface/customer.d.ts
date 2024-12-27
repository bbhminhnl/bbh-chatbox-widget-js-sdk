import { IDataAI } from "./ai";
/**dữ liệu khách hàng giải mã được*/
export interface CustomerInfo {
    /**thông tin cơ bản của khách hàng */
    public_profile?: {
        /**id trang */
        page_id?: string;
        /**id khách hàng */
        fb_client_id?: string;
        /**tên trang */
        page_name?: string;
        /**tên khách hàng */
        client_name?: string;
        /**mã xác thực của đối tác */
        token_partner?: string;
        /**id của nhân viên hiện tại */
        current_staff_id?: string;
        /**tên của nhân viên hiện tại */
        current_staff_name?: string;
        /**id của quảng cáo cuối cùng */
        last_ad_id?: string;
        /** dữ liệu ai */
        ai?: IDataAI[];
    };
    /**thông tin liên hệ của khách hàng */
    conversation_contact?: {
        /**số điện thoại */
        client_phone?: string;
        /**email */
        client_email?: string;
    };
    /**thông tin cuộc trò chuyện */
    conversation_message?: {
        /**thời gian cuối cùng khách hàng đọc tin nhắn */
        last_read_message?: string;
        /**thời gian cuối cùng tin nhắn phát sinh */
        last_message_time: number;
        /**nội dung tin nhắn cuối cùng */
        last_message?: string;
        /**loại tin nhắn cuối cùng */
        last_message_type?: 'page' | 'client';
    };
    /**thông tin gắn nhãn */
    conversation_label?: {
        /**danh sách id nhãn */
        label_id?: string[];
    };
    /**thông tin nhân viên được assign */
    conversation_staff?: {
        /**id nhân viên */
        fb_staff_id?: string;
        /**thông tin của nhân viên */
        snap_staff?: {
            /**tên nhân viên */
            name?: string;
        };
    };
}
