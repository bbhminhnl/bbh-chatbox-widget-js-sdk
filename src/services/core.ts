import { APP_SERVER, APP_SERVER_V2, WIDGET_SERVER } from './request'
import type { ChatboxEvent, CustomerInfo } from '../interface'

import { Base } from './base'

/**quản lý tương tác giữa widget và nền tảng Chat - Bot Bán Hàng*/
export class WidgetCore extends Base {
    /**khóa bí mật của widget, dùng để xác thực khi giải mã dữ liệu khách hàng */
    protected _secret_key?: string
    /** mã truy cập để oauth hoặc giải mã dữ liệu bản cũ*/
    protected _access_token?: string
    /** mã truy cập mới để oauth hoặc giải mã dữ liệu bản mới */
    protected _partner_token?: string
    /**nhân viên hiện tại có phải là admin của trang không */
    protected _is_admin?: boolean
    /**ID của trang đang được chọn */
    protected _page_id?: string
    /**ID của khách hàng đang được chọn */
    protected _client_id?: string
    /**ID của tin nhắn đã chọn */
    protected _message_id?: string
    /**ID của bình luận đã chọn */
    protected _comment_id?: string
    /**token của chatbot */
    protected _chatbot_token?: string

    /**lấy ra dữ liệu mã truy cập hiện tại của bản cũ*/
    get access_token() { return this._access_token }
    /**lấy ra dữ liệu mã truy cập hiện tại của bản mới */
    get partner_token() { return this._partner_token }
    /** lấy ra id của khách hàng */
    get client_id() { return this._client_id }
    /** lấy ra id của tin nhắn */
    get message_id() { return this._message_id }
    /** lấy ra id của bình luận */
    get comment_id() { return this._comment_id }
    /**nhân viên có phải là admin không */
    get is_admin() { return this._is_admin }
    /**thay đổi giá trị của mã truy cập thủ công */
    set access_token(value: string | undefined) {
        // cập nhật giá trị mới
        this._access_token = value

        // cập nhật lại header cho WIDGET_SERVER
        WIDGET_SERVER.headers = { Authorization: this._access_token }
    }

    /**thay đổi giá trị của mã truy cập mới */
    set partner_token(value: string | undefined) {
        // cập nhật giá trị mới
        this._partner_token = value
    }

    /** thay đổi id của khách hàng */
    set client_id(value: string | undefined) {
        // cập nhật giá trị mới
        this._client_id = value
    }

    /** thay đổi id của tin nhắn */
    set message_id(value: string | undefined) {
        // cập nhật giá trị mới
        this._message_id = value
    }

    /** thay đổi id của bình luận */
    set comment_id(value: string | undefined) {
        // cập nhật giá trị mới
        this._comment_id = value
    }

    /**Lấy giá trị của trường query từ URL */
    static #getQueryString(field: string): string | null {
        const VALUE = new URLSearchParams(
            globalThis.window?.location?.search
        ).get(field)

        /** nếu giá trị lấy từ param bằng chuỗi undefined thì trả về null */
        if(VALUE === 'undefined') return null
        return VALUE
    }
    /**Chuyển đổi giá trị thành kiểu boolean */
    static #toBoolean(value?: any): boolean {
        let result = false

        try { result = JSON.parse(value) } catch (e) { }

        return result
    }

    /**nạp access_token từ query string ban đầu */
    #loadAccessToken(): void {
        try {
            /**lấy mã truy cập từ query string */
            const ACCESS_TOKEN = WidgetCore.#getQueryString('access_token')

            // kiểm tra đầu vào
            // if (!ACCESS_TOKEN) throw 'Không tìm thấy mã truy cập'

            // nạp dữ liệu mã truy cập
            this.access_token = ACCESS_TOKEN || ''

            this.debug('Đã phát hiện mã truy cập', this._access_token)
        } catch (e) {
            throw e
        }
    }
    /** nạp partner_token trên query string */
    #loadPartnerToken(): void {
        try {
            /**lấy mã partner_token trong query string */
            const PARTNER_TOKEN = WidgetCore.#getQueryString('partner_token')

            // kiểm tra đầu vào
            if (!PARTNER_TOKEN) return

            // nạp dữ liệu partner_token
            this.partner_token = PARTNER_TOKEN

            this.debug('Đã phát hiện partner_token', this._partner_token)
        } catch (e) {
            throw e
        }
    }
    /** nap ID khách hàng từ query string ban đầu */
    #loadClientId(): void {
        try {
            /**lấy ID khách hàng từ query string */
            const CLIENT_ID = WidgetCore.#getQueryString('client_id')

            // kiểm tra đầu vào
            if (!CLIENT_ID && this._partner_token) throw 'Không tìm thấy ID khách hàng'

            // nếu không có client_id thì thôi
            if(!CLIENT_ID) return

            // nạp dữ liệu ID khách hàng
            this._client_id = CLIENT_ID

            this.debug('Đã phát hiện ID khách hàng', this._client_id)
        } catch (e) {
            throw e
        }
    }
    /** nạp ID tin nhắn từ query string ban đầu */
    #loadMessageId(): void {
        try {
            /**lấy ID tin nhắn từ query string */
            const MESSAGE_ID = WidgetCore.#getQueryString('message_id')

            // kiểm tra đầu vào
            if (!MESSAGE_ID) return

            // nạp dữ liệu ID tin nhắn
            this._message_id = MESSAGE_ID

            this.debug('Đã phát hiện ID tin nhắn', this._message_id)
        } catch (e) {
            // throw e
        }
    }
    /**nạp ID bình luận từ query string ban đầu */
    #loadCommentId(): void {
        try {
            /**lấy ID bình luận từ query string */
            const COMMENT_ID = WidgetCore.#getQueryString('comment_id')

            // kiểm tra đầu vào
            if (!COMMENT_ID) return

            // nạp dữ liệu ID bình luận
            this._comment_id = COMMENT_ID

            this.debug('Đã phát hiện ID bình luận', this._comment_id)
        } catch (e) {
            // throw e
        }
    }
    /**nạp trạng thái admin trang ban đầu */
    #loadAdminStatus(): void {
        try {
            /**lấy giá trị trạng thái admin từ query string */
            const RAW_IS_ADMIN = WidgetCore.#getQueryString('is_page_admin')

            // nạp dữ liệu trạng thái admin
            this._is_admin = WidgetCore.#toBoolean(RAW_IS_ADMIN)

            this.debug(
                this._is_admin ?
                    'Nhân viên là admin trang' :
                    'Nhân viên không phải là admin trang'
            )
        } catch (e) {
            throw e
        }
    }

    /**khởi động widget chatbox */
    public load(secret_key: string): void {
        try {
            // kiểm tra đầu vào
            if (!secret_key) throw 'Yêu cầu mã bí mật của widget'

            // nhập dữ liệu khoá bí mật
            this._secret_key = secret_key

            // nạp access_token từ query string
            this.#loadAccessToken()

            // nạp partner_token trên query string
            this.#loadPartnerToken()

            // nạp ID khách hàng từ query string
            this.#loadClientId()

            // nạp ID tin nhắn từ query string
            this.#loadMessageId()

            // nạp ID bình luận từ query string
            this.#loadCommentId()

            // nạp trạng thái admin trang ban đầu
            this.#loadAdminStatus()

            this.debug('Khởi động Widget thành công!')
        } catch (e) {
            this.error('Khởi động Widget thất bại', e)

            throw e
        }
    }
    /**thực hiện xác thực với Bot Bán Hàng */
    public async oAuth(token_partner?: string): Promise<any> {
        try {
            this.debug('Thực hiện xác thực với Bot Bán Hàng')

            // gửi yêu cầu xác thực
            const RES = await APP_SERVER.post(
                'app/app-installed/update',
                {
                    access_token: this._access_token,
                    token_partner: token_partner || 'active',
                    _type: 'oauth-access-token'
                },
            )

            this.debug('Xác thực thành công', RES)

            // trả về dữ liệu
            return RES
        } catch (e) {
            this.error('Xác thực thất bại', e)

            // trả về lỗi
            throw e
        }
    }
    /** 
     * giải mã thông tin khách hàng 
     * @deprecated dùng sang phương thức getClientInfo 
     * */
    public async decodeClient(): Promise<CustomerInfo> {
        try {
            this.debug('Thực hiện giải mã thông tin khách hàng')

            /**dữ liệu giải mã được */
            const RES: CustomerInfo = await APP_SERVER.post(
                'service/partner-authenticate',
                {
                    access_token: this._access_token,
                    secret_key: this._secret_key
                },
            )

            // lưu lại id của khách hàng hiện tại
            this._client_id = RES?.public_profile?.fb_client_id

            // TODO lưu lại token của chatbot mới
            // server mới chưa trả về chatbot token
            // this._chatbot_token = 

            this.debug('Giải mã thành công', RES)

            return RES
        } catch (e) {
            this.error('Giải mã thông tin khách hàng thất bại', e)

            // trả về lỗi
            throw e
        }
    }

    /** giải mã thông tin khách hàng bản mới*/
    public async getClientInfo(): Promise<CustomerInfo> {
        try {
            this.debug('Thực hiện giải má khách hàng')

            /**dữ liệu giải mã được */
            const RES: CustomerInfo = await APP_SERVER_V2.post(
                'partner/widget/client_info',
                {
                    access_token: this._partner_token,
                    client_id: this._client_id,
                    message_id: this._message_id,
                    comment_id: this._comment_id,
                    secret_key: this._secret_key
                },
            )

            // lưu lại id của khách hàng hiện tại
            this._client_id = RES?.public_profile?.fb_client_id

            this.debug('Giải mã khách hàng bản mới thành công', RES)

            return RES
        } catch (e) {
            this.error('Giải mã khách hàng bản mới thất bại', e)

            // trả về lỗi
            throw e
        }
    }

    /**nạp lại access_token mỗi khi thay đổi khách hàng trong trang */
    public onEvent(proceed?: Function): void {
        this.debug('Bắt đầu lắng nghe sự kiện thay đổi khách hàng')

        // reload dữ liệu không cần load lại toàn bộ widget
        globalThis.window.addEventListener(
            'message',
            ($event: MessageEvent<ChatboxEvent>) => {
                // chỉ xử lý event từ chatbox
                if ($event?.data?.from !== 'CHATBOX') return

                this.debug('Nhận được sự kiện từ Chatbox', $event?.data)

                // nạp lại mã truy cập mới
                if (
                    $event?.data?.type === 'RELOAD'
                ) {
                    /** id mã truy cập bản cũ được gửi từ event của chatbox */
                    const NEW_ACCESS_TOKEN = $event?.data?.payload?.access_token

                    /** id mã truy cập bản mới được gửi từ event của chatbox */
                    const NEW_PARTNER_TOKEN = $event?.data?.payload?.partner_token

                    /** id khách hàng được gửi từ event của chatbox */
                    const NEW_CLIENT_ID = $event?.data?.payload?.client_id

                    /** id tin nhắn được gửi từ event của chatbox */
                    const NEW_MESSAGE_ID = $event?.data?.payload?.message_id

                    /** id của comment được gửi từ event của chatbox */
                    const NEW_COMMENT_ID = $event?.data?.payload?.comment_id

                    // nạp lại mã truy cập bản cũ
                    if(NEW_ACCESS_TOKEN) this.access_token = NEW_ACCESS_TOKEN

                    // nạp lại mã truy cập bản mới
                    if(NEW_PARTNER_TOKEN) this.partner_token = NEW_PARTNER_TOKEN

                    // nạp lại id khách hàng
                    if(NEW_CLIENT_ID) this.client_id = NEW_CLIENT_ID

                    // nạp lại id của tin nhắn
                    if(NEW_MESSAGE_ID) this.message_id = NEW_MESSAGE_ID

                    // nạp lại id của comment
                    if(NEW_COMMENT_ID) this.comment_id = NEW_COMMENT_ID

                    this.debug('Đã nạp lại mã truy cập')
                }

                // gọi hàm tiếp theo nếu có
                if (proceed) proceed(null, $event?.data)
            }
        )
    }
}