import {
	parseTotal,
	type AppointmentFormData,
} from "@/features/appointments/schema";
import type { AppointmentInput } from "@/features/appointments/types";

const pad = (value: number): string => String(value).padStart(2, "0");

// ISO-рядок з бекенду -> значення для поля datetime-local
export const toDateTimeLocal = (iso: string): string => {
	const date = new Date(iso);
	const day = `${String(date.getFullYear())}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
	return `${day}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

// Дані форми (рядки) -> тіло запиту до бекенду
export const toAppointmentInput = (
	data: AppointmentFormData
): AppointmentInput => ({
	appointment_date: new Date(data.appointment_date).toISOString(),
	diagnosis: data.diagnosis,
	employee_id: Number(data.employee_id),
	exam_results: data.exam_results,
	medical_card_id: Number(data.medical_card_id),
	purpose: data.purpose,
	total: parseTotal(data.total),
});
