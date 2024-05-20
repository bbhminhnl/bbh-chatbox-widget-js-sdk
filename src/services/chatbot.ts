import { CHATBOT_SERVER } from "./request"
import { WidgetConfig } from "./setting"

/**quản lý tương tác giữa widget và chatbot */
export class WidgetChatbot extends WidgetConfig {
    /**gửi tin nhắn tới khách hàng thông qua chatbot */
    public async triggerChatbot(data: Record<string, any>): Promise<any> {
        try {
            this.debug('gửi tin nhắn tới khách hàng', data)

            /**kết quả sau khi gửi tin nhắn */
            const RES = await CHATBOT_SERVER.post(
                'public/json',
                {
                    access_token: this._chatbot_token,
                    client_id: this._client_id,
                    page_id: this._page_id,
                    ...data
                }
            )

            this.debug('gửi tin nhắn thành công', RES)

            // trả về dữ liệu
            return RES
        } catch (e) {
            this.error('gửi tin nhắn thất bại', e)

            // trả về lỗi
            throw e
        }

    }
}



