import { WidgetChatbot } from './services/chatbot';

/**quản lý tương tác giữa widget và nền tảng Chat - Bot Bán Hàng*/
export class Widget extends WidgetChatbot {}

// singleton
export default Widget.getInstance<Widget>('Widget')