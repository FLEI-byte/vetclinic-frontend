import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import apiClient from "@/lib/axios";
import type { ApiResponse } from "@/lib/api-types";
import type { Employee, EmployeeInput } from "@/features/employees/types";

// Функції для API-запитів
const getEmployees = async (): Promise<Employee[]> => {
	const response = await apiClient.get<ApiResponse<Employee[]>>("/employees");
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
}: {
	id: number;
	data: Partial<EmployeeInput>;
}): Promise<Employee> => {
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
export const useEmployees = () =>
	useQuery<Employee[]>({ queryKey: ["employees"], queryFn: getEmployees });

export const useEmployee = (id: number) =>
	useQuery<Employee>({
		queryKey: ["employees", id],
		queryFn: () => getEmployeeById(id),
	});

export const useCreateEmployee = () => {
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

export const useUpdateEmployee = () => {
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

export const useDeleteEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteEmployee,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["employees"] });
		},
	});
};
