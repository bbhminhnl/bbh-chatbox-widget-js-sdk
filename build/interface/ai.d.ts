/**địa điểm */
export interface ILocationData {
    /**số nhà */
    house_number?: number;
    /**tên đường */
    street_name?: string;
    /**địa chỉ */
    address?: string;
    /**phường */
    ward?: string;
    /**quận */
    district?: string;
    /**thành phố */
    city?: string;
    /**quốc gia */
    country?: string;
    /**địa điểm */
    place?: string;
}
/**dữ liệu hẹn lịch */
export interface RawAiDate {
    /**ngày yyyy-MM-dd */
    appointment_date?: string;
    /**giờ HH:mm */
    appointment_time?: string;
    /**múi giờ America/New_York */
    time_zone?: string;
    /**vị trí toạ độ */
    location?: string;
    /**nội dung tin nhắn đầu vào */
    input_message?: string;
    /**thời gian full ở dạng: 8/22/2024, 7:10:00 AM */
    date?: string;
    /**ghi chú mà AI bóc ra */
    notes?: string;
}
/**kết quả gốc phân loại tin nhắn */
export interface IScheduleAppointmentResult extends RawAiDate {
    /**mốc thời gian hẹn lịch */
    datetime?: number;
    /**ghi chú khi hẹn lịch */
    note?: string;
    /**chủ thể được hẹn */
    participant_name?: string;
    /**lý do tổng quan */
    appointment_purpose?: string;
}
/**thời gian */
export interface ITimeData {
    /**năm */
    year?: number;
    /**tháng, cẩn thận index từ 0 */
    month?: number;
    /**ngày trong tháng, 1 - 31 */
    day?: number;
    /**giờ, 0 - 23 */
    hour?: number;
    /**phút, 0 - 59 */
    minute?: number;
    /**thứ trong tuần: sunday */
    day_of_week?: string;
    /**thời gian tương đối: today */
    relative_time?: string;
}
/**tài chính */
export interface IFinancialData {
    /**mã giao dịch */
    transaction_id?: string;
    /**trạng thái giao dịch */
    transaction_status?: string;
    /**mô tả giao dịch */
    transaction_description?: string;
    /**số tiền */
    amount?: number;
    /**ngân hàng gửi */
    bank_sender?: string;
    /**người gửi */
    sender?: string;
    /**số tài khoản người gửi */
    sender_account_number?: string;
    /**ngân hàng nhận */
    bank_recipient?: string;
    /**người nhận */
    recipient?: string;
    /**số tài khoản người nhận */
    recipient_account_number?: string;
}
/**vận chuyển */
export interface IShippingData {
    /**địa điểm nhận */
    receiving_location?: string;
    /**loại phương tiện */
    vehicle_type?: string;
    /**biển số xe */
    license_plate?: string;
    /**tên tài xế */
    driver_name?: string;
}
/**bán hàng */
export interface ISalesData {
    /**mã đơn hàng */
    order_id?: string;
    /**ngày đặt hàng */
    order_date?: string;
    /**ngày giao hàng */
    delivery_date?: string;
    /**trạng thái đơn hàng */
    order_status?: string;
    /**tổng số tiền đơn hàng */
    total_order_amount?: number;
    /**tổng số tiền giảm giá */
    total_discount_amount?: number;
}
/**tài liệu chứng minh */
export interface IIdentificationDocuments {
    /**hộ chiếu */
    passport?: string;
    /**bằng lái xe */
    driving_license?: string;
    /**chứng minh nhân dân */
    citizen_identification?: string;
}
/**cảm xúc */
export type IEmotion = 'like' | 'happy' | 'sad' | 'angry';
/**số điện thoại */
export interface IPhoneNumber {
    /**số điện thoại */
    phone_number?: string[];
}
/**email */
export interface IEmail {
    /**email */
    email?: string[];
}
/**liên kết */
export interface ILink {
    /**liên kết */
    link?: string[];
}
/**dữ liệu liên hệ */
export interface IContactDatas extends IPhoneNumber, IEmail, ILink {
    /**cảm xúc */
    emotion?: IEmotion;
}
export interface ICta {
    /**địa chỉ */
    address?: ILocationData;
    /**nhận dạng giấy tờ */
    document?: IIdentificationDocuments;
    /**email */
    email?: IEmail;
    /**link */
    link?: ILink;
    /**sdt */
    phone?: IPhoneNumber;
    /**đơn hàng */
    place_order?: ILocationData & IPhoneNumber;
    /**bán hàng */
    sale?: ISalesData;
    /**vận chuyển */
    shipping?: IShippingData;
    /**time */
    schedule_appointment?: ITimeData & IScheduleAppointmentResult;
    /**giao dịch */
    create_transaction?: IFinancialData;
}
export interface IDataAI {
    /** Số điện thoại */
    phone_number?: string[];
    /** email */
    email?: string[];
    /** Đường dẫn */
    link?: string[];
    /** Năm */
    year?: string;
    /** Tháng */
    month?: string;
    /** Ngày */
    day?: string;
    /** Giờ */
    hour?: string;
    /** Phút */
    minute?: string;
    /** Địa chỉ */
    address?: string;
    /** Mã giao dịch */
    transaction_id?: string;
    /** Số tiền giao dịch */
    amount?: string;
    /** Ngân hàng gửi */
    bank_sender?: string;
    /** Mã đơn hàng */
    order_id?: string;
    /** Ngày đặt hàng */
    order_date?: string;
    /** Tổng giá trị đơn hàng */
    total_order_amount?: string;
    /** Tổng số tiền giảm giá */
    total_discount_amount?: string;
    /** Thao tác liên kết (CTA) */
    ctas?: ICta;
    /** OCR dữ liệu hóa đơn */
    ocr?: {
        /** Văn bản gốc */
        original_text?: string;
        /** Ngôn ngữ gốc */
        original_language?: string;
        /** Văn bản đã dịch */
        translated_text?: string;
        /** Độ tin cậy OCR */
        ocr_confidence?: number;
        /** Mô tả */
        description?: string;
        /** Loại tài liệu */
        document_type?: string;
        /** Loại thông điệp nguồn */
        origin_message_type?: string;
    };
    /** Ghi chú */
    note?: string;
    /** Dữ liệu thời gian */
    datetime?: string | null;
    /** Có sử dụng CTA không */
    cta?: boolean;
}
