import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import apiClient from "@/lib/axios";
import type { ApiResponse } from "@/lib/api-types";
import type { Client, ClientInput } from "@/features/clients/types";

// Функції для API-запитів
const getClients = async (): Promise<Client[]> => {
	const response = await apiClient.get<ApiResponse<Client[]>>("/clients");
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
}: {
	id: number;
	data: Partial<ClientInput>;
}): Promise<Client> => {
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
export const useClients = () =>
	useQuery<Client[]>({ queryKey: ["clients"], queryFn: getClients });

export const useClient = (id: number) =>
	useQuery<Client>({
		queryKey: ["clients", id],
		queryFn: () => getClientById(id),
	});

export const useCreateClient = () => {
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

export const useUpdateClient = () => {
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

export const useDeleteClient = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteClient,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["clients"] });
		},
	});
};
