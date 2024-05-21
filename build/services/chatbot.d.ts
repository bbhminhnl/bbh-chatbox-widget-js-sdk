import { WidgetConfig } from "./setting";
/**quản lý tương tác giữa widget và chatbot */
export declare class WidgetChatbot extends WidgetConfig {
    /**gửi tin nhắn tới khách hàng thông qua chatbot */
    triggerChatbot(data: Record<string, any>): Promise<any>;
}
