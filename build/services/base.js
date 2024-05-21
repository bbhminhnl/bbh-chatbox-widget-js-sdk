"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Base_instances, _a, _Base_SET_BLUE_COLOR, _Base_SET_GREEN_COLOR, _Base_RESET_COLOR, _Base_title, _Base_debug_mode, _Base_instance, _Base_initTitle;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
/**lớp cha chứa các phương thức hỗ trợ quan trọng */
class Base {
    constructor(me) {
        _Base_instances.add(this);
        /**màu xanh biển */
        _Base_SET_BLUE_COLOR.set(this, '\x1b[34m'
        /**màu xanh lá */
        );
        /**màu xanh lá */
        _Base_SET_GREEN_COLOR.set(this, '\x1b[32m'
        /**xoá màu */
        );
        /**xoá màu */
        _Base_RESET_COLOR.set(this, '\x1b[0m'
        /**tên của thực thể đang sử dụng */
        );
        /**tên của thực thể đang sử dụng */
        _Base_title.set(this, void 0);
        /**chế độ debug */
        _Base_debug_mode.set(this, false
        /**singleton */
        );
        // khởi tạo title
        __classPrivateFieldGet(this, _Base_instances, "m", _Base_initTitle).call(this, me);
    }
    /**singleton */
    static getInstance(...args) {
        var _b, _c;
        // nếu chưa có instance thì tạo mới
        if (!((_b = __classPrivateFieldGet(Base, _a, "f", _Base_instance)) === null || _b === void 0 ? void 0 : _b[this.name]))
            __classPrivateFieldGet(Base, _a, "f", _Base_instance)[this.name] = new this(...args);
        /**
         * trả về instance
         * - dùng as để ép kiểu cho class con thực tế đang sử dụng singleton
         */
        return (_c = __classPrivateFieldGet(Base, _a, "f", _Base_instance)) === null || _c === void 0 ? void 0 : _c[this.name];
    }
    /**sử dụng để debug khi cần */
    debug(...args) {
        // nếu không ở chế độ debug thì bỏ qua
        if (!__classPrivateFieldGet(this, _Base_debug_mode, "f"))
            return;
        // log thông tin
        console.log(__classPrivateFieldGet(this, _Base_title, "f"), ...args);
    }
    /**sử dụng để log lỗi */
    error(...args) {
        // nếu không ở chế độ debug thì bỏ qua
        if (!__classPrivateFieldGet(this, _Base_debug_mode, "f"))
            return;
        // log lỗi
        console.error(__classPrivateFieldGet(this, _Base_title, "f"), ...args);
    }
    /**bật chế độ debug */
    debugOn() { __classPrivateFieldSet(this, _Base_debug_mode, true, "f"); }
    /**tắt chế độ debug */
    debugOff() { __classPrivateFieldSet(this, _Base_debug_mode, false, "f"); }
}
exports.Base = Base;
_a = Base, _Base_SET_BLUE_COLOR = new WeakMap(), _Base_SET_GREEN_COLOR = new WeakMap(), _Base_RESET_COLOR = new WeakMap(), _Base_title = new WeakMap(), _Base_debug_mode = new WeakMap(), _Base_instances = new WeakSet(), _Base_initTitle = function _Base_initTitle(me) {
    /**tạo ra title cho logging */
    __classPrivateFieldSet(this, _Base_title, `${__classPrivateFieldGet(this, _Base_SET_GREEN_COLOR, "f")}[BBH]${__classPrivateFieldGet(this, _Base_RESET_COLOR, "f")}`, "f");
    // nếu có tên thực thể thì thêm vào title
    if (me)
        __classPrivateFieldSet(this, _Base_title, __classPrivateFieldGet(this, _Base_title, "f") + ` ${__classPrivateFieldGet(this, _Base_SET_BLUE_COLOR, "f")}[${me}]${__classPrivateFieldGet(this, _Base_RESET_COLOR, "f")}`, "f");
};
/**singleton */
_Base_instance = { value: {} };
