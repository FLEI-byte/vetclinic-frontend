import axios from "axios";
import { useAuthStore } from "@/store/authStore";

// Окремий інстанс Axios з базовою адресою API
const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Інтерцептор запиту: токен зі стору Zustand, а якщо його немає, то з .env
apiClient.interceptors.request.use((config) => {
	const token =
		useAuthStore.getState().token ?? import.meta.env.VITE_API_AUTH_TOKEN;
	if (token) {
		config.headers.set("Authorization", `Bearer ${token}`);
	}
	return config;
});

// Інтерцептор відповіді: глобальна обробка помилок
apiClient.interceptors.response.use(
	(response) => response,
	(error: unknown) => {
		if (axios.isAxiosError(error)) {
			console.error("API Error:", error.response?.data ?? error.message);
			return Promise.reject(error);
		}
		console.error("API Error:", error);
		return Promise.reject(
			error instanceof Error ? error : new Error(String(error))
		);
	}
);

export default apiClient;
