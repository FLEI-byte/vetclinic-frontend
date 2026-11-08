import type { AppointmentShort, ClientShort } from "@/features/shared/types";

// Те, що бекенд повертає (MedicalCardResponseDTO)
export type MedicalCard = {
	id: number;
	nickname: string;
	species: string;
	breed: string;
	sex: string;
	birth_date: string;
	created_date: string;
	client?: ClientShort;
	appointments?: Array<AppointmentShort>;
};

// Те, що бекенд приймає при створенні й оновленні (MedicalCardDto)
export type MedicalCardInput = {
	client_id: number;
	nickname: string;
	species: string;
	breed: string;
	sex: string;
	birth_date: string;
	created_date?: string;
};

// Змінні для мутації оновлення
export type MedicalCardUpdateVariables = {
	id: number;
	data: Partial<MedicalCardInput>;
};
