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
var _Request_instances, _Request_HOST, _Request_headers, _Request_genUri, _Request_genOptions;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHATBOT_SERVER = exports.WIDGET_SERVER = exports.APP_SERVER = exports.Request = void 0;
const axios_1 = __importDefault(require("axios"));
const base_1 = require("./base");
const constant_1 = require("../constant");
class Request extends base_1.Base {
    constructor(host, headers) {
        super('Request');
        _Request_instances.add(this);
        _Request_HOST.set(this, void 0);
        _Request_headers.set(this, void 0);
        __classPrivateFieldSet(this, _Request_HOST, constant_1.DOMAIN === null || constant_1.DOMAIN === void 0 ? void 0 : constant_1.DOMAIN[host], "f");
        __classPrivateFieldSet(this, _Request_headers, headers, "f");
    }
    set headers(value) {
        __classPrivateFieldSet(this, _Request_headers, value, "f");
    }
    post(path, body) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const URI = __classPrivateFieldGet(this, _Request_instances, "m", _Request_genUri).call(this, path);
                const OPTIONS = __classPrivateFieldGet(this, _Request_instances, "m", _Request_genOptions).call(this);
                const RES = yield axios_1.default.post(URI, body, OPTIONS);
                return ((_a = RES === null || RES === void 0 ? void 0 : RES.data) === null || _a === void 0 ? void 0 : _a.data) || (RES === null || RES === void 0 ? void 0 : RES.data) || RES;
            }
            catch (e) {
                throw ((_c = (_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) ||
                    ((_d = e === null || e === void 0 ? void 0 : e.response) === null || _d === void 0 ? void 0 : _d.data) ||
                    (e === null || e === void 0 ? void 0 : e.response) ||
                    (e === null || e === void 0 ? void 0 : e.message) ||
                    e;
            }
        });
    }
}
exports.Request = Request;
_Request_HOST = new WeakMap(), _Request_headers = new WeakMap(), _Request_instances = new WeakSet(), _Request_genUri = function _Request_genUri(path) { return `${__classPrivateFieldGet(this, _Request_HOST, "f")}/${path}`; }, _Request_genOptions = function _Request_genOptions() { return { headers: __classPrivateFieldGet(this, _Request_headers, "f") }; };
exports.APP_SERVER = Request.getInstance('APP');
exports.WIDGET_SERVER = Request.getInstance('WIDGET');
exports.CHATBOT_SERVER = Request.getInstance('CHATBOT');
