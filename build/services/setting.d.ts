import { WidgetCore } from "./core";
import type { ConfigBase, ProxyInput, SaveConfig } from "../interface";
/**quản lý việc lưu trữ thiết lập cho widget */
export declare class WidgetConfig extends WidgetCore {
    #private;
    /**lưu cấu hình của widget */
    saveConfig(data: SaveConfig): Promise<void>;
    /**Xóa thiết lập */
    deleteConfig(input: ConfigBase): Promise<void>;
    /**đọc thiết lập */
    getConfig(data: ConfigBase): Promise<void>;
    /**proxy API thông qua server để tránh CORS */
    proxy(input: ProxyInput): Promise<any>;
}
