import { z } from "zod";

export const parseTotal = (value: string): number =>
	Number(value.replace(",", "."));

export const appointmentSchema = z.object({
	appointment_date: z.string().min(1, "Вкажіть дату і час"),
	diagnosis: z.string().max(255, "Не більше 255 символів"),
	employee_id: z.string().min(1, "Оберіть співробітника"),
	exam_results: z.string(),
	medical_card_id: z.string().min(1, "Оберіть медичну картку"),
	purpose: z.string().trim().min(1, "Мета звернення обов'язкова"),
	total: z
		.string()
		.min(1, "Вкажіть суму")
		.refine((value) => parseTotal(value) > 0, "Сума має бути числом більше 0"),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
