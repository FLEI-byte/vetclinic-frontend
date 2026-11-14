import { z } from "zod";

export const loginSchema = z.object({
	email: z.email("Некоректна електронна пошта"),
	password: z.string().min(1, "Введіть пароль"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
