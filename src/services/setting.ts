import { WidgetCore } from "./core"
import { WIDGET_SERVER } from "./request"

import type { ConfigBase, ProxyInput, SaveConfig } from "../interface"

/**quản lý việc lưu trữ thiết lập cho widget */
export class WidgetConfig extends WidgetCore {
    /**cập nhật thiết lập */
    #updateConfig(data?: any): Promise<void> {
        // gọi API để lưu thiết lập
        return WIDGET_SERVER.post('setting/WidgetSetting/save-config', data)
    }

    /**lưu cấu hình của widget */
    public async saveConfig(data: SaveConfig): Promise<any> {
        try {
            this.debug('lưu thiết lập', data)

            /**kết quả sau khi lưu thiết lập */
            const RES = await this.#updateConfig(data)

            this.debug('lưu thiết lập thành công', RES)

            // trả về dữ liệu
            return RES
        } catch (e) {
            this.error('lưu thiết lập thất bại', e)

            // trả về lỗi
            throw e
        }
    }
    /**Xóa thiết lập */
    public async deleteConfig(input: ConfigBase): Promise<any> {
        try {
            this.debug('Xóa thiết lập', input)

            /**
             * kết quả sau khi xoá thiết lập 
             * - anh Mạnh không code phương thức xoá, nên phải ghi đè thiết lập
             */
            const RES = await this.#updateConfig({ ...input, config_data: {} })

            this.debug('xoá thiết lập thành công', RES)

            // trả về dữ liệu
            return RES
        } catch (e) {
            this.error('xoá thiết lập thất bại', e)

            // trả về lỗi
            throw e
        }
    }
    /**đọc thiết lập */
    public async getConfig(data: ConfigBase): Promise<any> {
        try {
            this.debug('đọc thiết lập', data)

            /**dữ liệu thiết lập */
            const RES = await WIDGET_SERVER.post(
                'setting/WidgetSetting/get-config',
                data,
            )

            /**dữ liệu thiết lập */
            const CONFIG = RES?.config_data

            this.debug('đọc thiết lập thành công', CONFIG)

            // trả về dữ liệu
            return CONFIG
        } catch (e) {
            this.error('xoá thiết lập thất bại', e)

            // trả về lỗi
            throw e
        }
    }

    /**proxy API thông qua server để tránh CORS */
    public async proxy(input: ProxyInput): Promise<any> {
        try {
            this.debug('gọi proxy', input)

            /**gọi API */
            const RES = await WIDGET_SERVER.post('proxy/index', input)

            /**dữ liệu trả về */
            const RESULT = RES?.data || RES

            this.debug('proxy thành công', RESULT)

            return RESULT
        } catch (e: any) {
            this.error('proxy thất bại', e)

            // trả về lỗi
            throw e?.error_message || e
        }
    }
}