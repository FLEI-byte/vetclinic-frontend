import { z } from "zod";

export const clientSchema = z.object({
	birth_date: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Вкажіть дату народження")
		.refine(
			(value) => new Date(value) < new Date(),
			"Дата має бути в минулому"
		),
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
});

export type ClientFormData = z.infer<typeof clientSchema>;
