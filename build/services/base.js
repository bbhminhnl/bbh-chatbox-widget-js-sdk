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
class Base {
    constructor(me) {
        _Base_instances.add(this);
        _Base_SET_BLUE_COLOR.set(this, '\x1b[34m');
        _Base_SET_GREEN_COLOR.set(this, '\x1b[32m');
        _Base_RESET_COLOR.set(this, '\x1b[0m');
        _Base_title.set(this, void 0);
        _Base_debug_mode.set(this, false);
        __classPrivateFieldGet(this, _Base_instances, "m", _Base_initTitle).call(this, me);
    }
    static getInstance(...args) {
        if (!__classPrivateFieldGet(Base, _a, "f", _Base_instance))
            __classPrivateFieldSet(Base, _a, new Base(...args), "f", _Base_instance);
        return __classPrivateFieldGet(Base, _a, "f", _Base_instance);
    }
    debug(...args) {
        if (!__classPrivateFieldGet(this, _Base_debug_mode, "f"))
            return;
        console.log(__classPrivateFieldGet(this, _Base_title, "f"), ...args);
    }
    error(...args) {
        if (!__classPrivateFieldGet(this, _Base_debug_mode, "f"))
            return;
        console.error(__classPrivateFieldGet(this, _Base_title, "f"), ...args);
    }
    debugOn() { __classPrivateFieldSet(this, _Base_debug_mode, true, "f"); }
    debugOff() { __classPrivateFieldSet(this, _Base_debug_mode, false, "f"); }
}
exports.Base = Base;
_a = Base, _Base_SET_BLUE_COLOR = new WeakMap(), _Base_SET_GREEN_COLOR = new WeakMap(), _Base_RESET_COLOR = new WeakMap(), _Base_title = new WeakMap(), _Base_debug_mode = new WeakMap(), _Base_instances = new WeakSet(), _Base_initTitle = function _Base_initTitle(me) {
    __classPrivateFieldSet(this, _Base_title, `${__classPrivateFieldGet(this, _Base_SET_GREEN_COLOR, "f")}[BBH]${__classPrivateFieldGet(this, _Base_RESET_COLOR, "f")}`, "f");
    if (me)
        __classPrivateFieldSet(this, _Base_title, __classPrivateFieldGet(this, _Base_title, "f") + ` ${__classPrivateFieldGet(this, _Base_SET_BLUE_COLOR, "f")}[${me}]${__classPrivateFieldGet(this, _Base_RESET_COLOR, "f")}`, "f");
};
_Base_instance = { value: void 0 };
