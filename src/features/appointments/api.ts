import {
	useMutation,
	useQuery,
	useQueryClient,
	type UseMutationResult,
	type UseQueryResult,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import apiClient from "@/lib/axios";
import type { ApiResponse } from "@/lib/api-types";
import type {
	Appointment,
	AppointmentInput,
	AppointmentUpdateVariables,
} from "@/features/appointments/types";

// Функції для API-запитів
const getAppointments = async (): Promise<Array<Appointment>> => {
	const response =
		await apiClient.get<ApiResponse<Array<Appointment>>>("/appointments");
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
}: AppointmentUpdateVariables): Promise<Appointment> => {
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
export const useAppointments = (): UseQueryResult<Array<Appointment>> =>
	useQuery<Array<Appointment>>({
		queryKey: ["appointments"],
		queryFn: getAppointments,
	});

export const useAppointment = (id: number): UseQueryResult<Appointment> =>
	useQuery<Appointment>({
		queryKey: ["appointments", id],
		queryFn: () => getAppointmentById(id),
	});

export const useCreateAppointment = (): UseMutationResult<
	Appointment,
	Error,
	AppointmentInput
> => {
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

export const useUpdateAppointment = (): UseMutationResult<
	Appointment,
	Error,
	AppointmentUpdateVariables
> => {
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

export const useDeleteAppointment = (): UseMutationResult<
	void,
	Error,
	number
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteAppointment,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["appointments"] });
		},
	});
};
