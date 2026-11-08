import type { MedicalCardShort } from "@/features/shared/types";

// Те, що бекенд повертає (ClientResponseDTO)
export type Client = {
	id: number;
	phone: string;
	full_name: string;
	birth_date: string;
	email: string;
	medical_cards?: MedicalCardShort[];
};

// Те, що бекенд приймає при створенні й оновленні (ClientDto)
export type ClientInput = {
	phone: string;
	last_name: string;
	first_name: string;
	patronymic: string;
	birth_date: string;
	email: string;
};
