"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = void 0;
const chatbot_1 = require("./services/chatbot");
class Widget extends chatbot_1.WidgetChatbot {
}
exports.Widget = Widget;
exports.default = Widget.getInstance('Widget');
