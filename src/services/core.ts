import { Base } from './base'
import { APP_SERVER, WIDGET_SERVER } from './request'

import type { ChatboxEvent, CustomerInfo } from '../interface'

/**quản lý tương tác giữa widget và nền tảng Chat - Bot Bán Hàng*/
export class WidgetCore extends Base {
    /**khóa bí mật của widget, dùng để xác thực khi giải mã dữ liệu khách hàng */
    protected _secret_key?: string
    /**mã truy cập để oauth hoặc giải mã dữ liệu */
    protected _access_token?: string
    /**nhân viên hiện tại có phải là admin của trang không */
    protected _is_admin?: boolean
    /**ID của trang đang được chọn */
    protected _page_id?: string
    /**ID của khách hàng đang được chọn */
    protected _client_id?: string
    /**token của chatbot */
    protected _chatbot_token?: string

    /**lấy ra dữ liệu mã truy cập hiện tại */
    get access_token() { return this._access_token }
    /**nhân viên có phải là admin không */
    get is_admin() { return this._is_admin }
    /**thay đổi giá trị của mã truy cập thủ công */
    set access_token(value: string | undefined) {
        // cập nhật giá trị mới
        this._access_token = value

        // cập nhật lại header cho WIDGET_SERVER
        WIDGET_SERVER.headers = { Authorization: this._access_token }
    }

    /**Lấy giá trị của trường query từ URL */
    static #getQueryString(field: string): string | null {
        return new URLSearchParams(
            globalThis.window?.location?.search
        ).get(field)
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
            if (!ACCESS_TOKEN) throw 'Không tìm thấy mã truy cập'

            // nạp dữ liệu mã truy cập
            this.access_token = ACCESS_TOKEN

            this.debug('Đã phát hiện mã truy cập', this._access_token)
        } catch (e) {
            throw e
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
    /**giải mã thông tin khách hàng */
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
                    $event?.data?.type === 'RELOAD' &&
                    $event?.data?.payload?.access_token
                ) {
                    // nạp lại mã truy cập
                    this.access_token = $event?.data?.payload?.access_token

                    this.debug('Đã nạp lại mã truy cập')
                }

                // gọi hàm tiếp theo nếu có
                if (proceed) proceed(null, $event?.data)
            }
        )
    }
}