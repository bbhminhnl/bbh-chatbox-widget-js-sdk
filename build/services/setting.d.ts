import { WidgetCore } from "./core";
import type { ConfigBase, ProxyInput, SaveConfig } from "../interface";
/**quản lý việc lưu trữ thiết lập cho widget */
export declare class WidgetConfig extends WidgetCore {
    #private;
    /**lưu cấu hình của widget */
    saveConfig(data: SaveConfig): Promise<any>;
    /**Xóa thiết lập */
    deleteConfig(input: ConfigBase): Promise<any>;
    /**đọc thiết lập */
    getConfig(data: ConfigBase): Promise<any>;
    /**proxy API thông qua server để tránh CORS */
    proxy(input: ProxyInput): Promise<any>;
}
