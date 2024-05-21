"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WidgetConfig_instances, _WidgetConfig_updateConfig;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetConfig = void 0;
const core_1 = require("./core");
const request_1 = require("./request");
/**quản lý việc lưu trữ thiết lập cho widget */
class WidgetConfig extends core_1.WidgetCore {
    constructor() {
        super(...arguments);
        _WidgetConfig_instances.add(this);
    }
    /**lưu cấu hình của widget */
    saveConfig(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.debug('lưu thiết lập', data);
                /**kết quả sau khi lưu thiết lập */
                const RES = yield __classPrivateFieldGet(this, _WidgetConfig_instances, "m", _WidgetConfig_updateConfig).call(this, data);
                this.debug('lưu thiết lập thành công', RES);
                // trả về dữ liệu
                return RES;
            }
            catch (e) {
                this.error('lưu thiết lập thất bại', e);
                // trả về lỗi
                throw e;
            }
        });
    }
    /**Xóa thiết lập */
    deleteConfig(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.debug('Xóa thiết lập', input);
                /**
                 * kết quả sau khi xoá thiết lập
                 * - anh Mạnh không code phương thức xoá, nên phải ghi đè thiết lập
                 */
                const RES = yield __classPrivateFieldGet(this, _WidgetConfig_instances, "m", _WidgetConfig_updateConfig).call(this, Object.assign(Object.assign({}, input), { config_data: {} }));
                this.debug('xoá thiết lập thành công', RES);
                // trả về dữ liệu
                return RES;
            }
            catch (e) {
                this.error('xoá thiết lập thất bại', e);
                // trả về lỗi
                throw e;
            }
        });
    }
    /**đọc thiết lập */
    getConfig(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.debug('đọc thiết lập', data);
                /**dữ liệu thiết lập */
                const RES = yield request_1.WIDGET_SERVER.post('setting/WidgetSetting/get-config', data);
                /**dữ liệu thiết lập */
                const CONFIG = RES === null || RES === void 0 ? void 0 : RES.config_data;
                this.debug('đọc thiết lập thành công', CONFIG);
                // trả về dữ liệu
                return CONFIG;
            }
            catch (e) {
                this.error('xoá thiết lập thất bại', e);
                // trả về lỗi
                throw e;
            }
        });
    }
    /**proxy API thông qua server để tránh CORS */
    proxy(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.debug('gọi proxy', input);
                /**gọi API */
                const RES = yield request_1.WIDGET_SERVER.post('proxy/index', input);
                /**dữ liệu trả về */
                const RESULT = (RES === null || RES === void 0 ? void 0 : RES.data) || RES;
                this.debug('proxy thành công', RESULT);
                return RESULT;
            }
            catch (e) {
                this.error('proxy thất bại', e);
                // trả về lỗi
                throw (e === null || e === void 0 ? void 0 : e.error_message) || e;
            }
        });
    }
}
exports.WidgetConfig = WidgetConfig;
_WidgetConfig_instances = new WeakSet(), _WidgetConfig_updateConfig = function _WidgetConfig_updateConfig(data) {
    // gọi API để lưu thiết lập
    return request_1.WIDGET_SERVER.post('setting/WidgetSetting/save-config', data);
};
