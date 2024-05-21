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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetChatbot = void 0;
const request_1 = require("./request");
const setting_1 = require("./setting");
class WidgetChatbot extends setting_1.WidgetConfig {
    triggerChatbot(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.debug('gửi tin nhắn tới khách hàng', data);
                const RES = yield request_1.CHATBOT_SERVER.post('public/json', Object.assign({ access_token: this._chatbot_token, client_id: this._client_id, page_id: this._page_id }, data));
                this.debug('gửi tin nhắn thành công', RES);
                return RES;
            }
            catch (e) {
                this.error('gửi tin nhắn thất bại', e);
                throw e;
            }
        });
    }
}
exports.WidgetChatbot = WidgetChatbot;
