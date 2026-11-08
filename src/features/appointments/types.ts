import type { EmployeeShort, MedicalCardShort } from "@/features/shared/types";

// Те, що бекенд повертає (AppointmentResponseDTO)
export type Appointment = {
	id: number;
	appointment_date: string;
	purpose: string;
	exam_results: string | null;
	diagnosis: string | null;
	total: number;
	medical_card?: MedicalCardShort;
	employee?: EmployeeShort;
};

// Те, що бекенд приймає при створенні й оновленні (AppointmentDto)
export type AppointmentInput = {
	medical_card_id: number;
	employee_id: number;
	appointment_date: string;
	purpose: string;
	exam_results?: string;
	diagnosis?: string;
	total: number;
};
