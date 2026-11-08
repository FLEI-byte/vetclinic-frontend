export type ClientShort = {
	id: number;
	phone: string;
	full_name: string;
	email: string;
};

export type EmployeeShort = {
	id: number;
	phone: string;
	full_name: string;
	position: string;
};

export type AppointmentShort = {
	id: number;
	appointment_date: string;
	purpose: string;
	diagnosis: string | null;
	total: number;
};

export type MedicalCardShort = {
	id: number;
	nickname: string;
	species: string;
	breed: string;
	sex: string;
	birth_date: string;
	created_date: string;
	client?: ClientShort;
};
