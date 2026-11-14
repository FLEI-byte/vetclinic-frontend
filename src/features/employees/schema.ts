import { z } from "zod";

export const employeeSchema = z.object({
	email: z
		.email("Некоректна електронна пошта")
		.max(255, "Не більше 255 символів"),
	first_name: z
		.string()
		.trim()
		.min(1, "Ім'я обов'язкове")
		.max(30, "Не більше 30 символів"),
	last_name: z
		.string()
		.trim()
		.min(1, "Прізвище обов'язкове")
		.max(30, "Не більше 30 символів"),
	patronymic: z
		.string()
		.trim()
		.min(1, "По батькові обов'язкове")
		.max(30, "Не більше 30 символів"),
	phone: z.string().regex(/^\+380\d{9}$/, "Формат телефону: +380XXXXXXXXX"),
	position: z
		.string()
		.trim()
		.min(1, "Посада обов'язкова")
		.max(50, "Не більше 50 символів"),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
