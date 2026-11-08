import axios from "axios";

// Окремий інстанс Axios з базовою адресою API
const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Якщо токен є у змінних середовища, додаємо його в Authorization
const token = import.meta.env.VITE_API_AUTH_TOKEN;
if (token) {
	apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Інтерцептор відповіді: глобальна обробка помилок
apiClient.interceptors.response.use(
	(response) => response,
	(error: unknown) => {
		if (axios.isAxiosError(error)) {
			console.error("API Error:", error.response?.data ?? error.message);
		} else {
			console.error("API Error:", error);
		}
		return Promise.reject(error);
	}
);

export default apiClient;
