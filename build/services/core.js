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
var _WidgetCore_instances, _a, _WidgetCore_getQueryString, _WidgetCore_toBoolean, _WidgetCore_loadAccessToken, _WidgetCore_loadPartnerToken, _WidgetCore_loadClientId, _WidgetCore_loadMessageId, _WidgetCore_loadAdminStatus;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetCore = void 0;
const base_1 = require("./base");
const request_1 = require("./request");
/**quản lý tương tác giữa widget và nền tảng Chat - Bot Bán Hàng*/
class WidgetCore extends base_1.Base {
    constructor() {
        super(...arguments);
        _WidgetCore_instances.add(this);
    }
    /**lấy ra dữ liệu mã truy cập hiện tại của bản cũ*/
    get access_token() { return this._access_token; }
    /**lấy ra dữ liệu mã truy cập hiện tại của bản mới */
    get partner_token() { return this._partner_token; }
    /** lấy ra id của khách hàng */
    get client_id() { return this._client_id; }
    /** lấy ra id của tin nhắn */
    get message_id() { return this._message_id; }
    /**nhân viên có phải là admin không */
    get is_admin() { return this._is_admin; }
    /**thay đổi giá trị của mã truy cập thủ công */
    set access_token(value) {
        // cập nhật giá trị mới
        this._access_token = value;
        // cập nhật lại header cho WIDGET_SERVER
        request_1.WIDGET_SERVER.headers = { Authorization: this._access_token };
    }
    /**thay đổi giá trị của mã truy cập mới */
    set partner_token(value) {
        // cập nhật giá trị mới
        this._partner_token = value;
    }
    /** thay đổi id của khách hàng */
    set client_id(value) {
        // cập nhật giá trị mới
        this._client_id = value;
    }
    /** thay đổi id của tin nhắn */
    set message_id(value) {
        // cập nhật giá trị mới
        this._message_id = value;
    }
    /**khởi động widget chatbox */
    load(secret_key) {
        try {
            // kiểm tra đầu vào
            if (!secret_key)
                throw 'Yêu cầu mã bí mật của widget';
            // nhập dữ liệu khoá bí mật
            this._secret_key = secret_key;
            // nạp access_token từ query string
            __classPrivateFieldGet(this, _WidgetCore_instances, "m", _WidgetCore_loadAccessToken).call(this);
            // nạp partner_token trên query string
            __classPrivateFieldGet(this, _WidgetCore_instances, "m", _WidgetCore_loadPartnerToken).call(this);
            // nạp ID khách hàng từ query string
            __classPrivateFieldGet(this, _WidgetCore_instances, "m", _WidgetCore_loadClientId).call(this);
            // nạp ID tin nhắn từ query string
            __classPrivateFieldGet(this, _WidgetCore_instances, "m", _WidgetCore_loadMessageId).call(this);
            // nạp trạng thái admin trang ban đầu
            __classPrivateFieldGet(this, _WidgetCore_instances, "m", _WidgetCore_loadAdminStatus).call(this);
            this.debug('Khởi động Widget thành công!');
        }
        catch (e) {
            this.error('Khởi động Widget thất bại', e);
            throw e;
        }
    }
    /**thực hiện xác thực với Bot Bán Hàng */
    oAuth(token_partner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.debug('Thực hiện xác thực với Bot Bán Hàng');
                // gửi yêu cầu xác thực
                const RES = yield request_1.APP_SERVER.post('app/app-installed/update', {
                    access_token: this._access_token,
                    token_partner: token_partner || 'active',
                    _type: 'oauth-access-token'
                });
                this.debug('Xác thực thành công', RES);
                // trả về dữ liệu
                return RES;
            }
            catch (e) {
                this.error('Xác thực thất bại', e);
                // trả về lỗi
                throw e;
            }
        });
    }
    /**
     * giải mã thông tin khách hàng
     * @deprecated dùng sang phương thức getClientInfo
     * */
    decodeClient() {
        var _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.debug('Thực hiện giải mã thông tin khách hàng');
                /**dữ liệu giải mã được */
                const RES = yield request_1.APP_SERVER.post('service/partner-authenticate', {
                    access_token: this._access_token,
                    secret_key: this._secret_key
                });
                // lưu lại id của khách hàng hiện tại
                this._client_id = (_b = RES === null || RES === void 0 ? void 0 : RES.public_profile) === null || _b === void 0 ? void 0 : _b.fb_client_id;
                // TODO lưu lại token của chatbot mới
                // server mới chưa trả về chatbot token
                // this._chatbot_token = 
                this.debug('Giải mã thành công', RES);
                return RES;
            }
            catch (e) {
                this.error('Giải mã thông tin khách hàng thất bại', e);
                // trả về lỗi
                throw e;
            }
        });
    }
    /** giải mã thông tin khách hàng bản mới*/
    getClientInfo() {
        var _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.debug('Thực hiện giải má khách hàng');
                /**dữ liệu giải mã được */
                const RES = yield request_1.APP_SERVER_V2.post('partner/widget/client_info', {
                    access_token: this._partner_token,
                    client_id: this._client_id,
                    message_id: this._message_id,
                    secret_key: this._secret_key
                });
                // lưu lại id của khách hàng hiện tại
                this._client_id = (_b = RES === null || RES === void 0 ? void 0 : RES.public_profile) === null || _b === void 0 ? void 0 : _b.fb_client_id;
                this.debug('Giải mã khách hàng bản mới thành công', RES);
                return RES;
            }
            catch (e) {
                this.error('Giải mã khách hàng bản mới thất bại', e);
                // trả về lỗi
                throw e;
            }
        });
    }
    /**nạp lại access_token mỗi khi thay đổi khách hàng trong trang */
    onEvent(proceed) {
        this.debug('Bắt đầu lắng nghe sự kiện thay đổi khách hàng');
        // reload dữ liệu không cần load lại toàn bộ widget
        globalThis.window.addEventListener('message', ($event) => {
            var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            // chỉ xử lý event từ chatbox
            if (((_b = $event === null || $event === void 0 ? void 0 : $event.data) === null || _b === void 0 ? void 0 : _b.from) !== 'CHATBOX')
                return;
            this.debug('Nhận được sự kiện từ Chatbox', $event === null || $event === void 0 ? void 0 : $event.data);
            // nạp lại mã truy cập mới
            if (((_c = $event === null || $event === void 0 ? void 0 : $event.data) === null || _c === void 0 ? void 0 : _c.type) === 'RELOAD') {
                /** id mã truy cập bản cũ được gửi từ event của chatbox */
                const NEW_ACCESS_TOKEN = (_e = (_d = $event === null || $event === void 0 ? void 0 : $event.data) === null || _d === void 0 ? void 0 : _d.payload) === null || _e === void 0 ? void 0 : _e.access_token;
                /** id mã truy cập bản mới được gửi từ event của chatbox */
                const NEW_PARTNER_TOKEN = (_g = (_f = $event === null || $event === void 0 ? void 0 : $event.data) === null || _f === void 0 ? void 0 : _f.payload) === null || _g === void 0 ? void 0 : _g.partner_token;
                /** id khách hàng được gửi từ event của chatbox */
                const NEW_CLIENT_ID = (_j = (_h = $event === null || $event === void 0 ? void 0 : $event.data) === null || _h === void 0 ? void 0 : _h.payload) === null || _j === void 0 ? void 0 : _j.client_id;
                /** id tin nhắn được gửi từ event của chatbox */
                const NEW_MESSAGE_ID = (_l = (_k = $event === null || $event === void 0 ? void 0 : $event.data) === null || _k === void 0 ? void 0 : _k.payload) === null || _l === void 0 ? void 0 : _l.message_id;
                // nạp lại mã truy cập bản cũ
                if (NEW_ACCESS_TOKEN)
                    this.access_token = NEW_ACCESS_TOKEN;
                // nạp lại mã truy cập bản mới
                if (NEW_PARTNER_TOKEN)
                    this.partner_token = NEW_PARTNER_TOKEN;
                // nạp lại id khách hàng
                if (NEW_CLIENT_ID)
                    this.client_id = NEW_CLIENT_ID;
                // nạp lại id của tin nhắn
                if (NEW_MESSAGE_ID)
                    this.message_id = NEW_MESSAGE_ID;
                this.debug('Đã nạp lại mã truy cập');
            }
            // gọi hàm tiếp theo nếu có
            if (proceed)
                proceed(null, $event === null || $event === void 0 ? void 0 : $event.data);
        });
    }
}
exports.WidgetCore = WidgetCore;
_a = WidgetCore, _WidgetCore_instances = new WeakSet(), _WidgetCore_getQueryString = function _WidgetCore_getQueryString(field) {
    var _b, _c;
    const VALUE = new URLSearchParams((_c = (_b = globalThis.window) === null || _b === void 0 ? void 0 : _b.location) === null || _c === void 0 ? void 0 : _c.search).get(field);
    /** nếu giá trị lấy từ param bằng chuỗi undefined thì trả về null */
    if (VALUE === 'undefined')
        return null;
    return VALUE;
}, _WidgetCore_toBoolean = function _WidgetCore_toBoolean(value) {
    let result = false;
    try {
        result = JSON.parse(value);
    }
    catch (e) { }
    return result;
}, _WidgetCore_loadAccessToken = function _WidgetCore_loadAccessToken() {
    try {
        /**lấy mã truy cập từ query string */
        const ACCESS_TOKEN = __classPrivateFieldGet(WidgetCore, _a, "m", _WidgetCore_getQueryString).call(WidgetCore, 'access_token');
        // kiểm tra đầu vào
        if (!ACCESS_TOKEN)
            throw 'Không tìm thấy mã truy cập';
        // nạp dữ liệu mã truy cập
        this.access_token = ACCESS_TOKEN;
        this.debug('Đã phát hiện mã truy cập', this._access_token);
    }
    catch (e) {
        throw e;
    }
}, _WidgetCore_loadPartnerToken = function _WidgetCore_loadPartnerToken() {
    try {
        /**lấy mã partner_token trong query string */
        const PARTNER_TOKEN = __classPrivateFieldGet(WidgetCore, _a, "m", _WidgetCore_getQueryString).call(WidgetCore, 'partner_token');
        // kiểm tra đầu vào
        if (!PARTNER_TOKEN)
            return;
        // nạp dữ liệu partner_token
        this.partner_token = PARTNER_TOKEN;
        this.debug('Đã phát hiện partner_token', this._partner_token);
    }
    catch (e) {
        throw e;
    }
}, _WidgetCore_loadClientId = function _WidgetCore_loadClientId() {
    try {
        /**lấy ID khách hàng từ query string */
        const CLIENT_ID = __classPrivateFieldGet(WidgetCore, _a, "m", _WidgetCore_getQueryString).call(WidgetCore, 'client_id');
        // kiểm tra đầu vào
        if (!CLIENT_ID && this._partner_token)
            throw 'Không tìm thấy ID khách hàng';
        // nếu không có client_id thì thôi
        if (!CLIENT_ID)
            return;
        // nạp dữ liệu ID khách hàng
        this._client_id = CLIENT_ID;
        this.debug('Đã phát hiện ID khách hàng', this._client_id);
    }
    catch (e) {
        throw e;
    }
}, _WidgetCore_loadMessageId = function _WidgetCore_loadMessageId() {
    try {
        /**lấy ID tin nhắn từ query string */
        const MESSAGE_ID = __classPrivateFieldGet(WidgetCore, _a, "m", _WidgetCore_getQueryString).call(WidgetCore, 'message_id');
        // kiểm tra đầu vào
        if (!MESSAGE_ID)
            return;
        // nạp dữ liệu ID tin nhắn
        this._message_id = MESSAGE_ID;
        this.debug('Đã phát hiện ID tin nhắn', this._message_id);
    }
    catch (e) {
        // throw e
    }
}, _WidgetCore_loadAdminStatus = function _WidgetCore_loadAdminStatus() {
    try {
        /**lấy giá trị trạng thái admin từ query string */
        const RAW_IS_ADMIN = __classPrivateFieldGet(WidgetCore, _a, "m", _WidgetCore_getQueryString).call(WidgetCore, 'is_page_admin');
        // nạp dữ liệu trạng thái admin
        this._is_admin = __classPrivateFieldGet(WidgetCore, _a, "m", _WidgetCore_toBoolean).call(WidgetCore, RAW_IS_ADMIN);
        this.debug(this._is_admin ?
            'Nhân viên là admin trang' :
            'Nhân viên không phải là admin trang');
    }
    catch (e) {
        throw e;
    }
};
