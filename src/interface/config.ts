/**các kiểu thiết lập */
type TypeConfig = 'CRM'

/**các dữ liệu cần thiết của thiết lập */
export interface ConfigBase {
    /**kiểu thiết lập */
    type_config: TypeConfig
    /**tên thương hiệu */
    brand_name: string
}

// Định nghĩa kiểu dữ liệu SaveConfigInput là một đối tượng có thuộc tính type_config kiểu TypeConfig, brand_name kiểu string và config_data kiểu bất kỳ
export interface SaveConfig extends ConfigBase {
    /**dữ liệu thiết lập */
    config_data: any
}

/**dữ liệu để gọi API proxy */
export interface ProxyInput {
    /**đường dẫn API thực tế */
    uri: string
    /**dữ liệu gửi đi */
    body?: any
    /**header gửi đi */
    headers?: any
    /**query string gửi đi */
    qs?: any
    /**phương thức gọi API */
    method?: 'POST' | 'GET' | 'DELETE' | 'PUT'
    /**cần trả về dữ liệu dạng json hay không */
    json?: boolean
}