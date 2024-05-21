/**lớp cha chứa các phương thức hỗ trợ quan trọng */
export class Base {
    /**màu xanh biển */
    #SET_BLUE_COLOR = '\x1b[34m'
    /**màu xanh lá */
    #SET_GREEN_COLOR = '\x1b[32m'
    /**xoá màu */
    #RESET_COLOR = '\x1b[0m'

    /**tên của thực thể đang sử dụng */
    #title?: string
    /**chế độ debug */
    #debug_mode: boolean = false

    /**singleton */
    static #instance: Record<string, Base> = {}

    constructor(me?: string) {
        // khởi tạo title
        this.#initTitle(me)
    }

    /**singleton */
    public static getInstance<T extends Base>(...args: any[]): T {
        // nếu chưa có instance thì tạo mới
        if (!Base.#instance?.[this.name])
            Base.#instance[this.name] = new this(...args)

        /**
         * trả về instance
         * - dùng as để ép kiểu cho class con thực tế đang sử dụng singleton
         */
        return Base.#instance?.[this.name] as T
    }

    /**khởi tạo title cho logging */
    #initTitle(me?: string): void {
        /**tạo ra title cho logging */
        this.#title = `${this.#SET_GREEN_COLOR}[BBH]${this.#RESET_COLOR}`

        // nếu có tên thực thể thì thêm vào title
        if (me) this.#title += ` ${this.#SET_BLUE_COLOR}[${me}]${this.#RESET_COLOR}`
    }

    /**sử dụng để debug khi cần */
    protected debug(...args: any[]): void {
        // nếu không ở chế độ debug thì bỏ qua
        if (!this.#debug_mode) return

        // log thông tin
        console.log(this.#title, ...args)
    }
    /**sử dụng để log lỗi */
    protected error(...args: any[]): void {
        // nếu không ở chế độ debug thì bỏ qua
        if (!this.#debug_mode) return

        // log lỗi
        console.error(this.#title, ...args)
    }

    /**bật chế độ debug */
    public debugOn(): void { this.#debug_mode = true }
    /**tắt chế độ debug */
    public debugOff(): void { this.#debug_mode = false }
}