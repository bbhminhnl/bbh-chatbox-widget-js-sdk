/**các kiểu thiết lập */
type TypeConfig = 'CRM';
/**các dữ liệu cần thiết của thiết lập */
export interface ConfigBase {
    /**kiểu thiết lập */
    type_config: TypeConfig;
    /**tên thương hiệu */
    brand_name: string;
}
export interface SaveConfig extends ConfigBase {
    /**dữ liệu thiết lập */
    config_data: any;
}
/**dữ liệu để gọi API proxy */
export interface ProxyInput {
    /**đường dẫn API thực tế */
    uri: string;
    /**dữ liệu gửi đi */
    body?: any;
    /**header gửi đi */
    headers?: any;
    /**query string gửi đi */
    qs?: any;
    /**phương thức gọi API */
    method?: 'POST' | 'GET' | 'DELETE' | 'PUT';
    /**cần trả về dữ liệu dạng json hay không */
    json?: boolean;
}
export {};
