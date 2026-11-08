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
	Client,
	ClientInput,
	ClientUpdateVariables,
} from "@/features/clients/types";

// Функції для API-запитів
const getClients = async (): Promise<Array<Client>> => {
	const response = await apiClient.get<ApiResponse<Array<Client>>>("/clients");
	return response.data.data;
};

const getClientById = async (id: number): Promise<Client> => {
	const response = await apiClient.get<ApiResponse<Client>>(`/clients/${id}`);
	return response.data.data;
};

const createClient = async (newClient: ClientInput): Promise<Client> => {
	const response = await apiClient.post<ApiResponse<Client>>(
		"/clients",
		newClient
	);
	return response.data.data;
};

const updateClient = async ({
	id,
	data,
}: ClientUpdateVariables): Promise<Client> => {
	const response = await apiClient.patch<ApiResponse<Client>>(
		`/clients/${id}`,
		data
	);
	return response.data.data;
};

const deleteClient = async (id: number): Promise<void> => {
	await apiClient.delete(`/clients/${id}`);
};

// Хуки для використання в компонентах
export const useClients = (): UseQueryResult<Array<Client>> =>
	useQuery<Array<Client>>({ queryKey: ["clients"], queryFn: getClients });

export const useClient = (id: number): UseQueryResult<Client> =>
	useQuery<Client>({
		queryKey: ["clients", id],
		queryFn: () => getClientById(id),
	});

export const useCreateClient = (): UseMutationResult<
	Client,
	Error,
	ClientInput
> => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: createClient,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["clients"] });
			void navigate({ to: "/clients" });
		},
	});
};

export const useUpdateClient = (): UseMutationResult<
	Client,
	Error,
	ClientUpdateVariables
> => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: updateClient,
		onSuccess: (updatedClient) => {
			void queryClient.invalidateQueries({ queryKey: ["clients"] });
			queryClient.setQueryData(["clients", updatedClient.id], updatedClient);
			void navigate({ to: "/clients" });
		},
	});
};

export const useDeleteClient = (): UseMutationResult<void, Error, number> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteClient,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["clients"] });
		},
	});
};
