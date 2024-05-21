type TypeConfig = 'CRM';
export interface ConfigBase {
    type_config: TypeConfig;
    brand_name: string;
}
export interface SaveConfig extends ConfigBase {
    config_data: any;
}
export interface ProxyInput {
    uri: string;
    body?: any;
    headers?: any;
    qs?: any;
    method?: 'POST' | 'GET' | 'DELETE' | 'PUT';
    json?: boolean;
}
export {};
