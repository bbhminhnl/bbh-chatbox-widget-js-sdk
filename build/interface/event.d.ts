/**dữ liệu được chatbox truyền sang */
export interface ChatboxEvent {
    /**sự kiện được gửi từ đâu */
    from?: 'CHATBOX';
    /**sự kiện dùng làm gì */
    type?: 'RELOAD';
    /**dữ liệu kèm theo */
    payload?: {
        /**token bản cũ */
        access_token?: string;
        /** token bản mới */
        partner_token?: string;
        /** id khách hàng */
        client_id?: string;
        /** id của tin nhắn */
        message_id?: string;
    };
}
