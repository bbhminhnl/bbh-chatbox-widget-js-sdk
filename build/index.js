"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = void 0;
const chatbot_1 = require("./services/chatbot");
/**quản lý tương tác giữa widget và nền tảng Chat - Bot Bán Hàng*/
class Widget extends chatbot_1.WidgetChatbot {
}
exports.Widget = Widget;
// singleton
exports.default = Widget.getInstance('Widget');
