# Frontend SDK

SDK này giúp tích hợp với nền tảng của chúng tôi, bao gồm các chức năng như thực hiện OAuth cho khách hàng, đọc thông tin khách hàng và lắng nghe sự thay đổi của khách hàng.

## Mục lục

1. [Cài đặt](#cài-đặt)
2. [Sử dụng](#sử-dụng)
3. [API](#api)
    - [OAuth](#oauth)
    - [Đọc thông tin khách hàng](#đọc-thông-tin-khách-hàng)
    - [Lắng nghe sự thay đổi của khách hàng](#lắng-nghe-sự-thay-đổi-của-khách-hàng)
4. [Đóng góp](#đóng-góp)
5. [Liên hệ](#liên-hệ)

## Cài đặt

Sử dụng npm để cài đặt SDK:

```bash
npm install @yourorg/frontend-sdk

Hoặc sử dụng yarn:

bash
Sao chép mã
yarn add @yourorg/frontend-sdk
Sử dụng
Dưới đây là ví dụ cơ bản về cách sử dụng SDK trong ứng dụng của bạn:

typescript
Sao chép mã
import { SDK } from '@yourorg/frontend-sdk';

const sdk = new SDK({
    clientId: 'YOUR_CLIENT_ID',
    redirectUri: 'YOUR_REDIRECT_URI'
});

// Thực hiện OAuth
sdk.oauth.authorize().then(() => {
    console.log('OAuth thành công!');
}).catch((error) => {
    console.error('Lỗi OAuth:', error);
});

// Đọc thông tin khách hàng
sdk.customer.getInfo().then((customerInfo) => {
    console.log('Thông tin khách hàng:', customerInfo);
}).catch((error) => {
    console.error('Lỗi khi lấy thông tin khách hàng:', error);
});

// Lắng nghe sự thay đổi của khách hàng
sdk.customer.onChange((newInfo) => {
    console.log('Thông tin khách hàng thay đổi:', newInfo);
});
API
OAuth
Thực hiện quá trình OAuth để xác thực khách hàng.

typescript
Sao chép mã
sdk.oauth.authorize(): Promise<void>
Đọc thông tin khách hàng
Lấy thông tin khách hàng hiện tại.

typescript
Sao chép mã
sdk.customer.getInfo(): Promise<CustomerInfo>
Lắng nghe sự thay đổi của khách hàng
Lắng nghe các sự thay đổi trong thông tin khách hàng.

typescript
Sao chép mã
sdk.customer.onChange(callback: (newInfo: CustomerInfo) => void): void
Đóng góp
Chúng tôi hoan nghênh mọi đóng góp! Vui lòng mở issue hoặc pull request trên GitHub.

Liên hệ
Nếu bạn có bất kỳ câu hỏi hoặc phản hồi nào, vui lòng liên hệ với chúng tôi qua email: support@yourorg.com.

less
Sao chép mã

Trong ví dụ này:

- Thay `@yourorg/frontend-sdk` bằng tên thực tế của gói SDK của bạn.
- Thay `YOUR_CLIENT_ID` và `YOUR_REDIRECT_URI` bằng thông tin cấu hình thực tế của bạn.
- Bạn có thể thêm nhiều chi tiết hơn về các hàm và tham số của chúng trong phần API nếu cần thiết.






