export interface ChatboxEvent {
    from?: 'CHATBOX';
    type?: 'RELOAD';
    payload?: {
        access_token?: string;
    };
}
