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
var _WidgetCore_instances, _a, _WidgetCore_getQueryString, _WidgetCore_toBoolean, _WidgetCore_loadAccessToken, _WidgetCore_loadAdminStatus;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetCore = void 0;
const base_1 = require("./base");
const request_1 = require("./request");
class WidgetCore extends base_1.Base {
    constructor(secret_key) {
        super('WidgetCore');
        _WidgetCore_instances.add(this);
        if (!secret_key)
            throw 'Yêu cầu mã bí mật của widget';
        this._SECRET_KEY = secret_key;
    }
    get access_token() { return this._access_token; }
    get is_admin() { return this._is_admin; }
    set access_token(value) {
        this._access_token = value;
    }
    load() {
        try {
            __classPrivateFieldGet(this, _WidgetCore_instances, "m", _WidgetCore_loadAccessToken).call(this);
            __classPrivateFieldGet(this, _WidgetCore_instances, "m", _WidgetCore_loadAdminStatus).call(this);
            this.debug('Khởi động Widget thành công!');
        }
        catch (e) {
            throw e;
        }
    }
    oAuth(token_partner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.debug('Thực hiện xác thực với Bot Bán Hàng');
                const RES = yield request_1.APP_SERVER.post('app/app-installed/update', {
                    access_token: this._access_token,
                    token_partner: token_partner || 'active',
                    _type: 'oauth-access-token'
                });
                this.debug('Xác thực thành công', RES);
                return RES;
            }
            catch (e) {
                this.error('Xác thực thất bại', e);
                throw e;
            }
        });
    }
    decodeClient() {
        var _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.debug('Thực hiện giải mã thông tin khách hàng');
                const RES = yield request_1.APP_SERVER.post('service/partner-authenticate', {
                    access_token: this._access_token,
                    secret_key: this._SECRET_KEY
                });
                this._client_id = (_b = RES === null || RES === void 0 ? void 0 : RES.public_profile) === null || _b === void 0 ? void 0 : _b.fb_client_id;
                this.debug('Giải mã thành công', RES);
                return RES;
            }
            catch (e) {
                this.error('Giải mã thông tin khách hàng thất bại', e);
                throw e;
            }
        });
    }
    onEvent(proceed) {
        this.debug('Bắt đầu lắng nghe sự kiện thay đổi khách hàng');
        window.addEventListener('message', ($event) => {
            var _b, _c, _d, _e, _f, _g;
            if (((_b = $event === null || $event === void 0 ? void 0 : $event.data) === null || _b === void 0 ? void 0 : _b.from) !== 'CHATBOX')
                return;
            this.debug('Nhận được sự kiện từ Chatbox', $event === null || $event === void 0 ? void 0 : $event.data);
            if (((_c = $event === null || $event === void 0 ? void 0 : $event.data) === null || _c === void 0 ? void 0 : _c.type) === 'RELOAD' &&
                ((_e = (_d = $event === null || $event === void 0 ? void 0 : $event.data) === null || _d === void 0 ? void 0 : _d.payload) === null || _e === void 0 ? void 0 : _e.access_token)) {
                this._access_token = (_g = (_f = $event === null || $event === void 0 ? void 0 : $event.data) === null || _f === void 0 ? void 0 : _f.payload) === null || _g === void 0 ? void 0 : _g.access_token;
                request_1.WIDGET_SERVER.headers = { Authorization: this._access_token };
                this.debug('Đã nạp lại mã truy cập');
            }
            if (proceed)
                proceed(null, $event === null || $event === void 0 ? void 0 : $event.data);
        });
    }
}
exports.WidgetCore = WidgetCore;
_a = WidgetCore, _WidgetCore_instances = new WeakSet(), _WidgetCore_getQueryString = function _WidgetCore_getQueryString(field) {
    return new URLSearchParams(window.location.search).get(field);
}, _WidgetCore_toBoolean = function _WidgetCore_toBoolean(value) {
    let result = false;
    try {
        result = JSON.parse(value);
    }
    catch (e) { }
    return result;
}, _WidgetCore_loadAccessToken = function _WidgetCore_loadAccessToken() {
    try {
        const ACCESS_TOKEN = __classPrivateFieldGet(WidgetCore, _a, "m", _WidgetCore_getQueryString).call(WidgetCore, 'access_token');
        if (!ACCESS_TOKEN)
            throw 'Không tìm thấy mã truy cập';
        this._access_token = ACCESS_TOKEN;
        this.debug('Đã phát hiện mã truy cập', this._access_token);
    }
    catch (e) {
        throw e;
    }
}, _WidgetCore_loadAdminStatus = function _WidgetCore_loadAdminStatus() {
    try {
        const RAW_IS_ADMIN = __classPrivateFieldGet(WidgetCore, _a, "m", _WidgetCore_getQueryString).call(WidgetCore, 'is_page_admin');
        this._is_admin = __classPrivateFieldGet(WidgetCore, _a, "m", _WidgetCore_toBoolean).call(WidgetCore, RAW_IS_ADMIN);
        this.debug(this._is_admin ?
            'Nhân viên là admin trang' :
            'Nhân viên không phải là admin trang');
    }
    catch (e) {
        throw e;
    }
};
