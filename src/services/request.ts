import axios from 'axios'
import { Base } from './base'
import { DOMAIN } from '../constant'

import type { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios'

/**quản lý việc gọi http API đến Bot Bán Hàng */
export class Request extends Base {
    /**máy chủ kết nối */
    #HOST: string

    /**các header mặc định */
    #headers?: RawAxiosRequestHeaders

    constructor(host: keyof typeof DOMAIN, headers?: RawAxiosRequestHeaders) {
        // thiet lập title khi log
        super('Request')

        // thiet lập host
        this.#HOST = DOMAIN?.[host]

        // thiet lập headers
        this.#headers = headers
    }

    /**thay đổi giá trị header mặc định */
    set headers(value: RawAxiosRequestHeaders | undefined) {
        this.#headers = value
    }

    /**tạo ra URI hoàn chỉnh để gọi API */
    #genUri(path: string): string { return `${this.#HOST}/${path}` }
    /**tạo ra các options để gọi API */
    #genOptions(): AxiosRequestConfig { return { headers: this.#headers } }

    /**gọi API theo phương thức POST */
    public async post(path: string, body?: any): Promise<any> {
        try {
            /**đường dẫn của API */
            const URI = this.#genUri(path)

            /**các options để gọi API */
            const OPTIONS = this.#genOptions()

            // gọi API
            const RES = await axios.post(URI, body, OPTIONS)

            // trả về dữ liệu
            return RES?.data?.data || RES?.data || RES
        } catch (e: any) {
            // trả về lỗi
            throw e?.response?.data?.message ||
            e?.response?.data ||
            e?.response ||
            e?.message ||
            e
        }
    }
}

/**máy chủ chính */
export const APP_SERVER = Request.getInstance<Request>('APP')
/**máy chủ phụ */
export const WIDGET_SERVER = Request.getInstance<Request>('WIDGET')
/**máy chủ chatbot */
export const CHATBOT_SERVER = Request.getInstance<Request>('CHATBOT')