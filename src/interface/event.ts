/**dữ liệu được chatbox truyền sang */
export interface ChatboxEvent {
    /**sự kiện được gửi từ đâu */
    from?: 'CHATBOX'
    /**sự kiện dùng làm gì */
    type?: 'RELOAD'
    /**dữ liệu kèm theo */
    payload?: {
        /**token mới */
        access_token?: string
        /** token v2 */
        partner_token?: string
        /** id khách hàng */
        client_id?: string
    }
}