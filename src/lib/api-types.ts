// Формат успішної відповіді бекенду (res.customSuccess)
export type ApiResponse<T> = {
	message: string;
	data: T;
};
