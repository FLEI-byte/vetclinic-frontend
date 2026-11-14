import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import apiClient from "@/lib/axios";
import type { ApiResponse } from "@/lib/api-types";
import type { LoginFormData } from "@/features/auth/schema";
import { useAuthStore } from "@/store/authStore";

const login = async (credentials: LoginFormData): Promise<string> => {
	const response = await apiClient.post<ApiResponse<string>>(
		"/auth/login",
		credentials
	);
	// Бекенд повертає рядок "Bearer <jwt>", а нам потрібен лише сам токен
	return response.data.data.replace("Bearer ", "");
};

export const useLogin = (): UseMutationResult<string, Error, LoginFormData> => {
	const setToken = useAuthStore((state) => state.setToken);
	const navigate = useNavigate();
	return useMutation({
		mutationFn: login,
		onSuccess: (token) => {
			setToken(token);
			void navigate({ to: "/" });
		},
	});
};
