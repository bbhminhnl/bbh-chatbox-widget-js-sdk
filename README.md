# Chat - Bot Bán Hàng - widget js SDK 

SDK này giúp đối tác xây dựng widget để tích hợp với nền tảng chat của chúng tôi

## Mục lục

1. [Cài đặt](#cài-đặt)
2. [Sử dụng](#sử-dụng)
3. [Liên hệ](#liên-hệ)

## Cài đặt

Sử dụng pnpm để cài đặt SDK:

```bash
pnpm i git+https://github.com/bbhminhnl/bbh-chatbox-widget-js-sdk.git
```

Sử dụng npm để cài đặt SDK:

```bash
npm i git+https://github.com/bbhminhnl/bbh-chatbox-widget-js-sdk.git
```

## Sử dụng

### 1. Import thư viện
```typescript
import WIDGET from 'bbh-chatbox-widget-js-sdk'
```

### 2. Khởi động widget
```typescript
WIDGET.load('<WIDGET_SECRET_KEY>')
```
### 3. Kích hoạt widget cho trang
```typescript
await WIDGET.oAuth()
```
### 4. Giải mã thông tin khách hàng
```typescript
let client = await WIDGET.decodeClient()
```
### 5. Kích hoạt chế độ debug
```typescript
WIDGET.debugOn()
```
### 6. Lắng nghe sự thay đổi khách hàng ở chế độ post message
```typescript
WIDGET.onEvent(async () => {
    // ghi lại thông tin khách hàng mới
    client = await WIDGET.decodeClient()
})
```

### 7. Ví dụ
```typescript
/**---------------------------- main.ts ---------------------------- */
import WIDGET from 'bbh-chatbox-widget-js-sdk'

// [optional] kích hoạt chế độ debug
WIDGET.debugOn()

// nạp secret_key của widget
WIDGET.load('<WIDGET_SECRET_KEY>')

/**---------------------------- Oauth.vue ---------------------------- */
import WIDGET from 'bbh-chatbox-widget-js-sdk'

// thực hiện các logic khác

// tiến hành xác thực widget, cài đặt widget cho trang
await WIDGET.oAuth()

/**---------------------------- dashboard.vue ---------------------------- */
import WIDGET from 'bbh-chatbox-widget-js-sdk'

// khai báo biến lưu trữ dữ liệu khách hàng + init dữ liệu lần đầu
let client = await WIDGET.decodeClient()

// [optional] lắng nghe khách hàng thay đổi ở chế độ post message
WIDGET.onEvent(async () => {
    // ghi lại thông tin khách hàng mới
    client = await WIDGET.decodeClient()
})
```

## Liên hệ
Nếu bạn có bất kỳ câu hỏi hoặc phản hồi nào, vui lòng liên hệ với chúng tôi qua email: minhnl@botbanhang.vn.