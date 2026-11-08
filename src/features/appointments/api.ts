import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import apiClient from "@/lib/axios";
import type { ApiResponse } from "@/lib/api-types";
import type {
	Appointment,
	AppointmentInput,
} from "@/features/appointments/types";

// Функції для API-запитів
const getAppointments = async (): Promise<Appointment[]> => {
	const response =
		await apiClient.get<ApiResponse<Appointment[]>>("/appointments");
	return response.data.data;
};

const getAppointmentById = async (id: number): Promise<Appointment> => {
	const response = await apiClient.get<ApiResponse<Appointment>>(
		`/appointments/${id}`
	);
	return response.data.data;
};

const createAppointment = async (
	newAppointment: AppointmentInput
): Promise<Appointment> => {
	const response = await apiClient.post<ApiResponse<Appointment>>(
		"/appointments",
		newAppointment
	);
	return response.data.data;
};

const updateAppointment = async ({
	id,
	data,
}: {
	id: number;
	data: Partial<AppointmentInput>;
}): Promise<Appointment> => {
	const response = await apiClient.patch<ApiResponse<Appointment>>(
		`/appointments/${id}`,
		data
	);
	return response.data.data;
};

const deleteAppointment = async (id: number): Promise<void> => {
	await apiClient.delete(`/appointments/${id}`);
};

// Хуки для використання в компонентах
export const useAppointments = () =>
	useQuery<Appointment[]>({
		queryKey: ["appointments"],
		queryFn: getAppointments,
	});

export const useAppointment = (id: number) =>
	useQuery<Appointment>({
		queryKey: ["appointments", id],
		queryFn: () => getAppointmentById(id),
	});

export const useCreateAppointment = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: createAppointment,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["appointments"] });
			void navigate({ to: "/appointments" });
		},
	});
};

export const useUpdateAppointment = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: updateAppointment,
		onSuccess: (updatedAppointment) => {
			void queryClient.invalidateQueries({ queryKey: ["appointments"] });
			queryClient.setQueryData(
				["appointments", updatedAppointment.id],
				updatedAppointment
			);
			void navigate({ to: "/appointments" });
		},
	});
};

export const useDeleteAppointment = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteAppointment,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["appointments"] });
		},
	});
};
