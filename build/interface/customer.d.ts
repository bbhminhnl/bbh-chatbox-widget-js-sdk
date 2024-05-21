export interface CustomerInfo {
    public_profile?: {
        page_id?: string;
        fb_client_id?: string;
        page_name?: string;
        client_name?: string;
        token_partner?: string;
        current_staff_id?: string;
        current_staff_name?: string;
        last_ad_id?: string;
    };
    conversation_contact?: {
        client_phone?: string;
        client_email?: string;
    };
    conversation_message?: {
        last_read_message?: string;
        last_message_time: number;
        last_message?: string;
        last_message_type?: 'page' | 'client';
    };
    conversation_label?: {
        label_id?: string[];
    };
    conversation_staff?: {
        fb_staff_id?: string;
        snap_staff?: {
            name?: string;
        };
    };
}
