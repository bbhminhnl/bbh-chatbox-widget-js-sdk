"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BbhChatboxWidget = void 0;
const axios_1 = __importDefault(require("axios"));
const lodash_1 = require("lodash");
const constant_1 = require("./constant");
class BbhChatboxWidget {
    constructor(input) {
        this._is_debug = input.is_debug;
        this._chatbox_secret_key = input.chatbox_secret_key;
    }
    get chatbox_widget_access_token() {
        return this._chatbox_widget_access_token;
    }
    set chatbox_widget_access_token(value) {
        this._chatbox_widget_access_token = value;
    }
    get is_chatbox_page_admin() {
        return this._is_chatbox_page_admin;
    }
    _log(...data) {
        if (!this._is_debug)
            return;
        console.log('BBH-Widget:', ...data);
    }
    _post_json(uri, body, headers, proceed) {
        axios_1.default
            .post(uri, body, { headers: headers })
            .then(r => { var _a; return proceed(null, ((_a = r === null || r === void 0 ? void 0 : r.data) === null || _a === void 0 ? void 0 : _a.data) || r.data || r); })
            .catch(e => { var _a, _b, _c; return proceed(((_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || ((_c = e === null || e === void 0 ? void 0 : e.response) === null || _c === void 0 ? void 0 : _c.data) || (e === null || e === void 0 ? void 0 : e.response) || (e === null || e === void 0 ? void 0 : e.message) || e); });
    }
    _get_query_string(field) {
        return new URLSearchParams(window.location.search).get(field);
    }
    _init_chatbox_widget_access_token() {
        this._chatbox_widget_access_token = this._get_query_string('access_token');
        this._log(`Phát hiện mã truy cập của widget chatbox:`, this._chatbox_widget_access_token);
    }
    _to_boolean(value) {
        let result = false;
        try {
            result = JSON.parse(value);
        }
        catch (e) { }
        return result;
    }
    _init_is_chatbox_page_admin() {
        this._is_chatbox_page_admin = this._to_boolean(this._get_query_string('is_page_admin'));
        this._log(`Phát hiện giá trị xác định xem trang hiện tại có phải là trang quản trị của chatbox hay không:`, this._is_chatbox_page_admin);
    }
    init(proceed) {
        if (!proceed)
            throw new Error('Yêu cầu callback function');
        if (!this._chatbox_secret_key)
            proceed('Yêu cầu chatbox_secret_key');
        this._init_chatbox_widget_access_token();
        this._init_is_chatbox_page_admin();
        if (!this._chatbox_widget_access_token)
            proceed('Yêu cầu chatbox_widget_access_token');
        this._log('Khởi tạo Bbh Chatbox Widget thành công!');
        proceed();
    }
    save_config(data, proceed) {
        this._log('Thực hiện lưu cấu hình');
        this._post_json(`${constant_1.CHATBOX_WIDGET_DOMAIN}/setting/WidgetSetting/save-config`, data, { Authorization: this._chatbox_widget_access_token }, proceed);
    }
    delete_config(input, proceed) {
        this._log('Thực hiện xóa cấu hình');
        this._post_json(`${constant_1.CHATBOX_WIDGET_DOMAIN}/setting/WidgetSetting/save-config`, Object.assign(Object.assign({}, input), { config_data: {} }), { Authorization: this._chatbox_widget_access_token }, proceed);
    }
    get_config(data, proceed) {
        this._log('Thực hiện lấy cấu hình');
        this._post_json(`${constant_1.CHATBOX_WIDGET_DOMAIN}/setting/WidgetSetting/get-config`, data, { Authorization: this._chatbox_widget_access_token }, (e, r) => {
            if (e && e.error_message)
                return proceed(e.error_message);
            if (e)
                return proceed(e);
            if (r && r.config_data)
                return proceed(null, r.config_data);
            proceed(null, r);
        });
    }
    connect_widget_to_page_chatbox(token_partner, proceed) {
        this._log('Bắt đầu kết nối widget và chatbox trên trang');
        this._post_json(`${constant_1.CHATBOX_APP_DOMAIN}/app/app-installed/update`, {
            access_token: this._chatbox_widget_access_token,
            token_partner: token_partner || 'active',
            _type: 'oauth-access-token'
        }, {}, proceed);
    }
    get_client_info(proceed) {
        this._log('Lấy thông tin khách hàng');
        this._post_json(`${constant_1.CHATBOX_APP_DOMAIN}/service/partner-authenticate`, {
            access_token: this._chatbox_widget_access_token,
            secret_key: this._chatbox_secret_key
        }, {}, (e, r) => {
            this._chatbot_public_token = (0, lodash_1.get)(r, 'r.data.conversation_chatbot.bbh_public_token');
            this._fb_client_id = (0, lodash_1.get)(r, 'data.public_profile.fb_client_id');
            proceed(e, r);
        });
    }
    send_message_to_client(data, proceed) {
        this._log('Gửi tin nhắn tới khách hàng');
        this._post_json(`${constant_1.CHATBOT_DOMAIN}/public/json?access_token=${this._chatbot_public_token}&psid=${this._fb_client_id}`, data, {}, proceed);
    }
    proxy_request(input, proceed) {
        this._post_json(`${constant_1.CHATBOX_WIDGET_DOMAIN}/proxy/index`, input, { Authorization: this._chatbox_widget_access_token }, (e, r) => {
            if (e)
                return proceed((e === null || e === void 0 ? void 0 : e.error_message) || e);
            proceed(null, (r === null || r === void 0 ? void 0 : r.data) || r);
        });
    }
    on_chatbox_message(proceed) {
        window.addEventListener('message', ($event) => {
            var _a, _b, _c, _d, _e, _f;
            if (((_a = $event === null || $event === void 0 ? void 0 : $event.data) === null || _a === void 0 ? void 0 : _a.from) !== 'CHATBOX' ||
                ((_b = $event === null || $event === void 0 ? void 0 : $event.data) === null || _b === void 0 ? void 0 : _b.type) !== 'RELOAD' ||
                !((_d = (_c = $event === null || $event === void 0 ? void 0 : $event.data) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.access_token))
                return;
            this._chatbox_widget_access_token = (_f = (_e = $event === null || $event === void 0 ? void 0 : $event.data) === null || _e === void 0 ? void 0 : _e.payload) === null || _f === void 0 ? void 0 : _f.access_token;
            proceed();
        });
    }
}
exports.BbhChatboxWidget = BbhChatboxWidget;
