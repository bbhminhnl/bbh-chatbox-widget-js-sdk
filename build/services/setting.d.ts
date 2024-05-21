import { WidgetCore } from "./core";
import type { ConfigBase, ProxyInput, SaveConfig } from "../interface";
export declare class WidgetConfig extends WidgetCore {
    #private;
    saveConfig(data: SaveConfig): Promise<void>;
    deleteConfig(input: ConfigBase): Promise<void>;
    getConfig(data: ConfigBase): Promise<void>;
    proxy(input: ProxyInput): Promise<any>;
}
