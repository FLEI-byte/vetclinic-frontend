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
	MedicalCard,
	MedicalCardInput,
	MedicalCardUpdateVariables,
} from "@/features/medical-cards/types";

// Функції для API-запитів
const getMedicalCards = async (): Promise<Array<MedicalCard>> => {
	const response =
		await apiClient.get<ApiResponse<Array<MedicalCard>>>("/medical-cards");
	return response.data.data;
};

const getMedicalCardById = async (id: number): Promise<MedicalCard> => {
	const response = await apiClient.get<ApiResponse<MedicalCard>>(
		`/medical-cards/${id}`
	);
	return response.data.data;
};

const createMedicalCard = async (
	newCard: MedicalCardInput
): Promise<MedicalCard> => {
	const response = await apiClient.post<ApiResponse<MedicalCard>>(
		"/medical-cards",
		newCard
	);
	return response.data.data;
};

const updateMedicalCard = async ({
	id,
	data,
}: MedicalCardUpdateVariables): Promise<MedicalCard> => {
	const response = await apiClient.patch<ApiResponse<MedicalCard>>(
		`/medical-cards/${id}`,
		data
	);
	return response.data.data;
};

const deleteMedicalCard = async (id: number): Promise<void> => {
	await apiClient.delete(`/medical-cards/${id}`);
};

// Хуки для використання в компонентах
export const useMedicalCards = (): UseQueryResult<Array<MedicalCard>> =>
	useQuery<Array<MedicalCard>>({
		queryKey: ["medical-cards"],
		queryFn: getMedicalCards,
	});

export const useMedicalCard = (id: number): UseQueryResult<MedicalCard> =>
	useQuery<MedicalCard>({
		queryKey: ["medical-cards", id],
		queryFn: () => getMedicalCardById(id),
	});

export const useCreateMedicalCard = (): UseMutationResult<
	MedicalCard,
	Error,
	MedicalCardInput
> => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: createMedicalCard,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["medical-cards"] });
			void navigate({ to: "/medical-cards" });
		},
	});
};

export const useUpdateMedicalCard = (): UseMutationResult<
	MedicalCard,
	Error,
	MedicalCardUpdateVariables
> => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: updateMedicalCard,
		onSuccess: (updatedCard) => {
			void queryClient.invalidateQueries({ queryKey: ["medical-cards"] });
			queryClient.setQueryData(["medical-cards", updatedCard.id], updatedCard);
			void navigate({ to: "/medical-cards" });
		},
	});
};

export const useDeleteMedicalCard = (): UseMutationResult<
	void,
	Error,
	number
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteMedicalCard,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["medical-cards"] });
		},
	});
};
