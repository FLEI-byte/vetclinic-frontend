import { z } from "zod";

export const SEX_VALUES = ["чоловіча", "жіноча"] as const;

export const medicalCardSchema = z.object({
	birth_date: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Вкажіть дату народження")
		.refine(
			(value) => new Date(value) < new Date(),
			"Дата має бути в минулому"
		),
	breed: z
		.string()
		.trim()
		.min(1, "Порода обов'язкова")
		.max(50, "Не більше 50 символів"),
	client_id: z.string().min(1, "Оберіть власника"),
	nickname: z
		.string()
		.trim()
		.min(1, "Кличка обов'язкова")
		.max(50, "Не більше 50 символів"),
	sex: z.enum(SEX_VALUES, "Оберіть стать"),
	species: z
		.string()
		.trim()
		.min(1, "Вид обов'язковий")
		.max(50, "Не більше 50 символів"),
});

export type MedicalCardFormData = z.infer<typeof medicalCardSchema>;
