
export abstract class BaseService<T> {
    /**
     * Lấy dữ liệu theo id
     */
    abstract get(id: string): Promise<T>;

    /**
     * Lấy toàn bộ dữ liệu
     */
    abstract getAll(): Promise<T>;

    /**
     *
     * Tạo mới dữ liệu
     *
     * @param data
     * @returns boolean
     * @throws Error
     *
     */
    abstract create(data: T): Promise<T>;

    /**
     *
     * Cập nhật dữ liệu
     *
     * @param data
     * @returns boolean
     * @throws Error
     *
     */
    abstract update(data: T): Promise<T>;

    /**
     *
     * Xóa dữ liệu
     *
     * @param data
     * @returns boolean
     * @throws Error
     *
     */
    abstract delete(data: T): Promise<boolean>;
}
