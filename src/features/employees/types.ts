import type { AppointmentShort } from "@/features/shared/types";

// Те, що бекенд повертає (EmployeeResponseDTO)
export type Employee = {
	id: number;
	phone: string;
	full_name: string;
	position: string;
	email: string;
	appointments?: Array<AppointmentShort>;
};

// Те, що бекенд приймає при створенні й оновленні (EmployeeDto)
export type EmployeeInput = {
	phone: string;
	last_name: string;
	first_name: string;
	patronymic: string;
	position: string;
	email: string;
};

// Змінні для мутації оновлення
export type EmployeeUpdateVariables = {
	id: number;
	data: Partial<EmployeeInput>;
};
