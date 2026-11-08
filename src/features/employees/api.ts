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
	Employee,
	EmployeeInput,
	EmployeeUpdateVariables,
} from "@/features/employees/types";

// Функції для API-запитів
const getEmployees = async (): Promise<Array<Employee>> => {
	const response =
		await apiClient.get<ApiResponse<Array<Employee>>>("/employees");
	return response.data.data;
};

const getEmployeeById = async (id: number): Promise<Employee> => {
	const response = await apiClient.get<ApiResponse<Employee>>(
		`/employees/${id}`
	);
	return response.data.data;
};

const createEmployee = async (
	newEmployee: EmployeeInput
): Promise<Employee> => {
	const response = await apiClient.post<ApiResponse<Employee>>(
		"/employees",
		newEmployee
	);
	return response.data.data;
};

const updateEmployee = async ({
	id,
	data,
}: EmployeeUpdateVariables): Promise<Employee> => {
	const response = await apiClient.patch<ApiResponse<Employee>>(
		`/employees/${id}`,
		data
	);
	return response.data.data;
};

const deleteEmployee = async (id: number): Promise<void> => {
	await apiClient.delete(`/employees/${id}`);
};

// Хуки для використання в компонентах
export const useEmployees = (): UseQueryResult<Array<Employee>> =>
	useQuery<Array<Employee>>({ queryKey: ["employees"], queryFn: getEmployees });

export const useEmployee = (id: number): UseQueryResult<Employee> =>
	useQuery<Employee>({
		queryKey: ["employees", id],
		queryFn: () => getEmployeeById(id),
	});

export const useCreateEmployee = (): UseMutationResult<
	Employee,
	Error,
	EmployeeInput
> => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: createEmployee,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["employees"] });
			void navigate({ to: "/employees" });
		},
	});
};

export const useUpdateEmployee = (): UseMutationResult<
	Employee,
	Error,
	EmployeeUpdateVariables
> => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: updateEmployee,
		onSuccess: (updatedEmployee) => {
			void queryClient.invalidateQueries({ queryKey: ["employees"] });
			queryClient.setQueryData(
				["employees", updatedEmployee.id],
				updatedEmployee
			);
			void navigate({ to: "/employees" });
		},
	});
};

export const useDeleteEmployee = (): UseMutationResult<void, Error, number> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteEmployee,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["employees"] });
		},
	});
};
