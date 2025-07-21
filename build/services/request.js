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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Request_instances, _a, _Request_HOST, _Request_headers, _Request_instance, _Request_genUri, _Request_genOptions;
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_SERVER_V2 = exports.CHATBOT_SERVER = exports.WIDGET_SERVER = exports.APP_SERVER = exports.Request = void 0;
const axios_1 = __importDefault(require("axios"));
const base_1 = require("./base");
const constant_1 = require("../constant");
/**quản lý việc gọi http API đến Bot Bán Hàng */
class Request extends base_1.Base {
    constructor(host, headers) {
        // thiet lập title khi log
        super('Request');
        _Request_instances.add(this);
        /**máy chủ kết nối */
        _Request_HOST.set(this, void 0);
        /**các header mặc định */
        _Request_headers.set(this, void 0);
        // thiet lập host
        __classPrivateFieldSet(this, _Request_HOST, constant_1.DOMAIN === null || constant_1.DOMAIN === void 0 ? void 0 : constant_1.DOMAIN[host], "f");
        // thiet lập headers
        __classPrivateFieldSet(this, _Request_headers, headers, "f");
    }
    /**singleton */
    static getInstanceByHost(host, headers) {
        var _b, _c;
        // nếu chưa có instance thì tạo mới
        if (!((_b = __classPrivateFieldGet(Request, _a, "f", _Request_instance)) === null || _b === void 0 ? void 0 : _b[host]))
            __classPrivateFieldGet(Request, _a, "f", _Request_instance)[host] = new Request(host, headers);
        // trả về instance
        return (_c = __classPrivateFieldGet(Request, _a, "f", _Request_instance)) === null || _c === void 0 ? void 0 : _c[host];
    }
    /**thay đổi giá trị header mặc định */
    set headers(value) {
        __classPrivateFieldSet(this, _Request_headers, value, "f");
    }
    /** custom lại host domain */
    set host(value) {
        __classPrivateFieldSet(this, _Request_HOST, value, "f");
    }
    /**gọi API theo phương thức POST */
    post(path, body) {
        var _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /**đường dẫn của API */
                const URI = __classPrivateFieldGet(this, _Request_instances, "m", _Request_genUri).call(this, path);
                /**các options để gọi API */
                const OPTIONS = __classPrivateFieldGet(this, _Request_instances, "m", _Request_genOptions).call(this);
                // gọi API
                const RES = yield axios_1.default.post(URI, body, OPTIONS);
                // trả về dữ liệu
                return ((_b = RES === null || RES === void 0 ? void 0 : RES.data) === null || _b === void 0 ? void 0 : _b.data) || (RES === null || RES === void 0 ? void 0 : RES.data) || RES;
            }
            catch (e) {
                // trả về lỗi
                throw ((_d = (_c = e === null || e === void 0 ? void 0 : e.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) ||
                    ((_e = e === null || e === void 0 ? void 0 : e.response) === null || _e === void 0 ? void 0 : _e.data) ||
                    (e === null || e === void 0 ? void 0 : e.response) ||
                    (e === null || e === void 0 ? void 0 : e.message) ||
                    e;
            }
        });
    }
}
exports.Request = Request;
_a = Request, _Request_HOST = new WeakMap(), _Request_headers = new WeakMap(), _Request_instances = new WeakSet(), _Request_genUri = function _Request_genUri(path) { return `${__classPrivateFieldGet(this, _Request_HOST, "f")}/${path}`; }, _Request_genOptions = function _Request_genOptions() { return { headers: __classPrivateFieldGet(this, _Request_headers, "f") }; };
/**singleton */
_Request_instance = { value: {} };
/**máy chủ chính */
exports.APP_SERVER = Request.getInstanceByHost('APP');
/**máy chủ phụ */
exports.WIDGET_SERVER = Request.getInstanceByHost('WIDGET');
/**máy chủ chatbot */
exports.CHATBOT_SERVER = Request.getInstanceByHost('CHATBOT');
/**máy chủ chính v2 */
exports.APP_SERVER_V2 = Request.getInstanceByHost('APP_V2');
