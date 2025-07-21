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

    /**singleton */
    static #instance: Record<string, Request> = {}

    constructor(host: keyof typeof DOMAIN, headers?: RawAxiosRequestHeaders) {
        // thiet lập title khi log
        super('Request')

        // thiet lập host
        this.#HOST = DOMAIN?.[host]

        // thiet lập headers
        this.#headers = headers
    }

    /**singleton */
    public static getInstanceByHost(
        host: keyof typeof DOMAIN, 
        headers?: RawAxiosRequestHeaders
    ): Request {
        // nếu chưa có instance thì tạo mới
        if (!Request.#instance?.[host])
            Request.#instance[host] = new Request(host, headers)

        // trả về instance
        return Request.#instance?.[host]
    }

    /**thay đổi giá trị header mặc định */
    set headers(value: RawAxiosRequestHeaders | undefined) {
        this.#headers = value
    }

    /** custom lại host domain */
    set host(value: string) {
        this.#HOST = value
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
export const APP_SERVER = Request.getInstanceByHost('APP')
/**máy chủ phụ */
export const WIDGET_SERVER = Request.getInstanceByHost('WIDGET')
/**máy chủ chatbot */
export const CHATBOT_SERVER = Request.getInstanceByHost('CHATBOT')
/**máy chủ chính v2 */
export const APP_SERVER_V2 = Request.getInstanceByHost('APP_V2')