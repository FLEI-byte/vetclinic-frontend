import { create } from "zustand";

type AuthState = {
	clearToken: () => void;
	setToken: (token: string) => void;
	token: string | null;
};

const STORAGE_KEY = "vetclinic_token";

const readStoredToken = (): string | null => {
	try {
		return localStorage.getItem(STORAGE_KEY);
	} catch {
		return null;
	}
};

export const useAuthStore = create<AuthState>((set) => ({
	clearToken: (): void => {
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {
			// сховище недоступне, токен лишається лише в пам'яті
		}
		set({ token: null });
	},
	setToken: (token): void => {
		try {
			localStorage.setItem(STORAGE_KEY, token);
		} catch {
			// сховище недоступне, токен лишається лише в пам'яті
		}
		set({ token });
	},
	token: readStoredToken(),
}));
